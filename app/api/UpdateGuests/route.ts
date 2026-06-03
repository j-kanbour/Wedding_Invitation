import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";


//Update guest members in the spreadsheet with the new RSVP data
/*
    GuestID: INT
    FamilyName: STRING
    FirstName: STRING
    LastName: STRING
    RSVP: STRING
    Dietary: STRING
    Message: STRING
*/

// Create a new JWT client using the credentials
const credentials = JSON.parse(
  process.env.GOOGLE_CREDENTIALS!
);

credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

const client = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetId = process.env.SPREADSHEET_ID;

// Authorize and create a Google Sheets API instance
const sheets = google.sheets({ version: "v4", auth: client });

function findRow(guestId: string): Promise<number | null> {

    return sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "'Guest List Total'!A2:A",
    }).then(response => {

        const values = response.data.values ?? [];

        for (let i = 0; i < values.length; i++) {
            if (values[i][0] === guestId) {
                return i + 2; // Return the row number (1-based index)
            }
        }

        return null; // Guest ID not found
    });
}

export async function POST(request: Request): Promise<NextResponse>
{
    const requestData = await request.json();

    for (const guestId in requestData) {
        const guestInfo = requestData[guestId];
        const row = await findRow(guestId);

        if (row) {
            if (guestInfo.isUnnamed) {
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `'Guest List Total'!D${row}:H${row}`,
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: [[
                            guestInfo.firstName,
                            guestInfo.lastName,
                            guestInfo.rsvp,
                            guestInfo.dietary,
                            guestInfo.message
                        ]]
                    }
                });
            } else {
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `'Guest List Total'!F${row}:H${row}`,
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: [[
                            guestInfo.rsvp,
                            guestInfo.dietary,
                            guestInfo.message
                        ]]
                    }
                });
            }
        } else {
            console.warn(`Guest ID ${guestId} not found in the spreadsheet.`);
        }
    }
    return NextResponse.json({ ok: true });
}
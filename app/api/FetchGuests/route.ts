import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";
import { GuestData } from "@/app/components/rsvp/types";


//From the spreadsheet, fetch and format the data on individual family members
/*
    GuestID: string (UUID)
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

// Authorize and create a Google Sheets API instance
const sheets = google.sheets({ version: "v4", auth: client });

export async function GET(request: Request): Promise<NextResponse<GuestData | { error: string }>> 
{
    const { searchParams } = new URL(request.url);
    const paramFamilyID = searchParams.get("paramFamilyID");

    if (!paramFamilyID) {
        return NextResponse.json({ error: "Missing familyId parameter" }, { status: 400 });
    }
    const spreadsheetId = process.env.SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "'Guest List Total'!A2:H",
        
    });

    const values = response.data.values ?? [];

    const result: GuestData = {};
    for (const row of values) {
        const [guestId, familyID, familyName, firstName, lastName, rsvp, dietary, message] = row;
        if (guestId && familyID == paramFamilyID) {
            const fn = firstName ?? "";
            const ln = lastName ?? "";
            result[guestId] = {
                familyName: familyName ?? "",
                firstName: fn,
                lastName: ln,
                rsvp: rsvp ?? "",
                dietary: dietary ?? "",
                message: message ?? "",
                isUnnamed: fn === "" && ln === "",
            };
        }
    }

    return NextResponse.json(result);
}
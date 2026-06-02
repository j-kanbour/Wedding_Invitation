import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";
import { FamilyData } from "@/app/components/rsvp/types";

//From the spreadsheet, fetch and format the data on the families list
/*
  FamilyID: INT
  FamilyName: STRING
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

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<NextResponse<FamilyData>> {
    const spreadsheetId = process.env.SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "'Guest List Total'!B2:D",
    });

    const values = response.data.values ?? [];

    const result: FamilyData = {};
    for (const row of values) {
        const [familyId, familyName] = row;
        if (familyId) {
          result[familyId] = familyName ?? "";
        } 
    }

    return NextResponse.json(result);
}
import fs from "fs";
import { google } from "googleapis";
import path from "path";

const sheets = google.sheets({ version: "v4" });

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
	const credentials = JSON.parse(
		fs.readFileSync(path.join(process.env.GOOGLE_APPLICATION_CREDENTIALS))
	);
	sheets.options.auth = credentials;
}

export async function updateSheetOnServer(spreadsheetId, range, value) {
	const request = {
		spreadsheetId: spreadsheetId,
		range: range,
		valueInputOption: "RAW",
		resource: {
			values: [[value]],
		},
		auth: sheets.options.auth,
	};

	try {
		const response = await sheets.spreadsheets.values.update(request);
		console.log("Celda actualizada:", response.data);
	} catch (error) {
		console.error("Error al actualizar la celda:", error);
	}
}

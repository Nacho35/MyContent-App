import { getSession } from "next-auth/client";

async function getAccessToken() {
	const response = await fetch("http://127.0.0.1:3000/api/token", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to obtain access token");
	}

	const data = await response.json();
	return data.accessToken;
}

export async function updateGoogleSheet(sheetName, range, value) {
	const session = await getSession();

	if (!session) {
		throw new Error("User not authenticated");
	}

	const accessToken = await getAccessToken();

	const url = `https://sheets.googleapis.com/spreadsheets/values/${sheetName}/${range}?valueInputOption=RAW&access_token=${accessToken}`;
	const data = JSON.stringify({ values: [[value]] }); // Ajusta esto según tus necesidades

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error("Error updating Google Sheet:", error);
	}
}

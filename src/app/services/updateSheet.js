export async function updateGoogleSheet(
	spreadsheetId,
	range,
	value,
	accessToken,
	user
) {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`;
	const options = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			range: range,
			values: [[value]],
			majorDimension: "ROWS",
		}),
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${errorData.error.message}`
			);
		}

		const logResponse = await fetch("/api/logChange", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: user,
				timestamp: new Date().toISOString(),
				row: range.replace(/[^\d]/g, ""),
				column: range.replace(/\d/g, ""),
				status: value,
			}),
		});
		if (!logResponse.ok) {
			throw new Error(`Error logging change: ${logResponse.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error al actualizar Google Sheets:", error.message);
		if (error.response) {
			console.error("Datos:", error.response.data);
			console.error("Estado:", error.response.status);
			console.error("Headers:", error.response.headers);
		}
		throw error;
	}
}

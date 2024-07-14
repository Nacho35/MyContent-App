export async function updateGoogleSheet(sheetId, range, value, accessToken) {
	console.log(accessToken);

	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:update`;
	const options = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			values: [[value]],
		}),
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

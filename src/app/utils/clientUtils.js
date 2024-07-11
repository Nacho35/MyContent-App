export async function updateSheetOnClient(spreadsheetId, range, value) {
	const response = await fetch("/api/update-sheet", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			spreadsheetId,
			range,
			value,
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
}

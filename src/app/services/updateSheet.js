export async function updateGoogleSheet(sheetName, range, value) {
	const scriptUrl =
		"https://script.google.com/macros/s/AKfycby2CGYjjAVh22Nilc_lFkyr4JYpKs6P13_U96ovsOpejXxtFmKYx0h60iaG2wTLQTzS1w/exec";
	const data = JSON.stringify({ sheetName, range, value });

	try {
		const response = await fetch(scriptUrl, {
			method: "POST",
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

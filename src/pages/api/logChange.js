export default async function handler(req, res) {
	if (req.method === "POST") {
		const { user, timestamp, row, column, status } = req.body;

		const logUrl =
			"https://script.google.com/macros/s/AKfycbydH19tUpV2VOjT4DPwMBuyF8zrr1QSpSKnDzdH6MnTeZPj-QQpmDy_5GeCznGKNiOakA/exec";
		const logData = {
			user,
			timestamp,
			row,
			column,
			status,
		};

		try {
			await fetch(logUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(logData),
			});

			res.status(200).json({ message: "Cambio registrado exitosamente" });
		} catch (error) {
			console.error("Error al registrar cambio:", error);
			res.status(500).json({ message: "Error al registrar cambio" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

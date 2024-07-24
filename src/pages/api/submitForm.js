export default async function handler(req, res) {
	if (req.method === "POST") {
		const {
			usuario,
			telefono,
			estado,
			llamadasRealizadas,
			fechaSeguimiento,
			fechaCreacion,
			fechaAsignacion,
			comentarios,
		} = req.body;

		const url =
			"https://script.google.com/macros/s/AKfycbxQBPZSfuNztV7uhXpDRUo4rhQ0aemLnLZ8oRq3kkJlWJ-ibhWNSWu4nNCb4ma_KI2XCQ/exec";
		const data = {
			usuario,
			telefono,
			estado,
			llamadasRealizadas,
			fechaSeguimiento,
			fechaCreacion,
			fechaAsignacion,
			comentarios,
		};

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			res.status(200).json({ message: "Datos guardados exitosamente" });
		} catch (error) {
			console.error("Error al guardar los datos:", error);
			res.status(500).json({ message: "Error al guardar los datos" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

import { updateSheetOnServer } from "../../app/utils/serverUtils";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { spreadsheetId, range, value } = req.body;
		try {
			await updateSheetOnServer(spreadsheetId, range, value);
			res
				.status(200)
				.json({ message: "Hoja de cálculo actualizada exitosamente." });
		} catch (error) {
			res
				.status(500)
				.json({ error: "Hubo un error al actualizar la hoja de cálculo." });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

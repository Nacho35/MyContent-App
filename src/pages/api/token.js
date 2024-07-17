import { getSession } from "next-auth/react";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { code } = req.body;

		try {
			const response = await fetch("https://oauth2.googleapis.com/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					client_id: process.env.GOOGLE_CLIENT_ID,
					client_secret: process.env.GOOGLE_CLIENT_SECRET,
					redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
					grant_type: "authorization_code",
					code,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const { access_token } = await response.json();

			const session = await getSession({ req });
			session.accessToken = access_token;
			session.idToken = id_token;

			res.status(200).json({ accessToken: access_token, idToken: id_token });
		} catch (error) {
			console.error(
				"Error intercambiando el código de autorización por el token de acceso:",
				error
			);
			res.status(500).json({ error: "Error interno del servidor" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Método ${req.method} no permitido`);
	}
}

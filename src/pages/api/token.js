import { getSession } from "next-auth/client";

export default async function handler(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({ message: "Not authenticated" });
	}

	const accessToken = session.accessToken;

	res.status(200).json({ accessToken });
}

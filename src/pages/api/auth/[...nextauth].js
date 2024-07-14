import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const GOOGLE_AUTHORIZATION_URL =
	`${process.env.NEXTAUTH_URL}/api/auth/callback/google` +
	"?" +
	new URLSearchParams({
		prompt: "select_account",
		access_type: "offline",
		response_type: "code",
		scope: "https://www.googleapis.com/auth/spreadsheets",
	}).toString();

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorizationUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
		verifyRequest: "/auth/verify-request",
		newUser: null,
	},
	secret: process.env.NEXTAUTH_SECRET,
});

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token) {
	try {
		const url = new URL("https://oauth2.googleapis.com/token");
		url.searchParams.append("client_id", process.env.GOOGLE_CLIENT_ID);
		url.searchParams.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
		url.searchParams.append("grant_type", "refresh_token");
		url.searchParams.append("refresh_token", token.refreshToken);

		const response = await fetch(url.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "select_account",
					access_type: "offline",
					response_type: "code",
					scope:
						"openid profile email https://www.googleapis.com/auth/spreadsheets",
				},
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		newUser: null,
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.accessTokenExpires = Date.now() + 1800 * 1000;
				token.idToken = account.id_token;
			}

			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			return refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.idToken = token.idToken;
			session.error = token.error;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

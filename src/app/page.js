"use client";
import SignIn from "@/pages/api/auth/SignIn";
import { SessionProvider } from "next-auth/react";
export default function Home() {
	return (
		<SessionProvider session={null}>
			<SignIn />
		</SessionProvider>
	);
}

"use client";
import SignIn from "@/pages/api/auth/signIn";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
export default function Home() {
	return (
		<SessionProvider session={null}>
			<SignIn />
			<Toaster position="top-center" reverseOrder={false} />
		</SessionProvider>
	);
}

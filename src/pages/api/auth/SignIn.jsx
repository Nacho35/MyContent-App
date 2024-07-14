"use client";
import Form from "@/app/components/Form";
import Nav from "@/app/components/Nav";
import { Spinner } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import clock from "/public/clock.svg";
import google from "/public/google.svg";

const SignIn = () => {
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		try {
			await signIn("google");
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
			alert(
				"Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo."
			);
		} finally {
			setLoading(false);
		}
	};

	if (status === "loading") {
		return (
			<div className="text-center">
				<Spinner color="warning" aria-label="Loading" />
			</div>
		);
	}

	if (session) {
		return (
			<>
				<Nav />
				<Form />
			</>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-blue-600 w-full">
			<div className="border border-white rounded-lg p-10 m-4">
				<h1 className="text-2xl font-bold text-center text-white uppercase">
					Inicio de sesion
				</h1>
				<div className="p-6 items-center sm:m-auto flex flex-col sm:flex-row">
					<h2 className="text-lg sm:text-2xl font-bold text-center text-white flex items-center sm:items-start uppercase">
						<Image
							src={clock}
							alt="logo"
							width={38}
							height={38}
							className="sm:block mr-2"
						/>
						State Switcher
					</h2>
				</div>

				<div>
					<p className="text-center my-4 text-white">
						Utiliza tu cuenta de Google para continuar.
					</p>
				</div>
				<div className="flex justify-center">
					<button
						disabled={loading}
						className={`mt-4 px-4 py-2 ${
							loading
								? "opacity-50 cursor-not-allowed"
								: "bg-black hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
						} inline-flex items-center`}
						onClick={handleSignIn}>
						{loading ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 0116 0H4z"></path>
								</svg>
								Cargando...
							</>
						) : (
							<>
								<span className="pr-2">
									<Image src={google} alt="logo" width={20} height={20} />
								</span>
								Iniciar Sesión con Google
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

"use client";
import Footer from "@/app/components/Footer";
import Form from "@/app/components/Form";
import Nav from "@/app/components/Nav";
import { Spinner } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import clock from "/public/clock.svg";
import google from "/public/google.svg";

const SignIn = () => {
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (session && !sessionStorage.getItem("welcomeShown")) {
			toast.success("¡Bienvenido! 🙋‍♂️");
			sessionStorage.setItem("welcomeShown", "true");
		}
	}, [session]);

	const handleSignIn = async () => {
		setLoading(true);
		try {
			await signIn("google");
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
			toast.error(
				"¡Ups! Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo. 😔"
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
				<Footer />
			</>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-blue-600 w-full p-4 cursor-default">
			<div className="flex flex-col w-full max-w-md p-10 bg-blue-400 m-auto rounded-lg shadow">
				<h1 className="text-2xl font-bold text-center text-white capitalize">
					Iniciar sesión
				</h1>
				<div className="p-4 items-center flex flex-col">
					<Image
						src={clock}
						alt="logo"
						width={70}
						height={70}
						className="my-4"
					/>
					<h2 className="text-2xl font-bold text-center text-white flex items-center uppercase">
						Closers App
					</h2>
				</div>

				<div>
					<p className="text-center my-2 text-white">
						Utiliza tu cuenta de Google para continuar
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

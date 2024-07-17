import { Button } from "flowbite-react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const Signout = () => {
	const handleSignOut = async () => {
		try {
			await signOut({ callbackUrl: "/" });
			toast.success("¡Sesión cerrada! 👋");
			sessionStorage.removeItem("welcomeShown");
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
			toast.error("¡Hubo un problema al cerrar sesión! 😞");
		}
	};

	return (
		<Button className="flex" color="failure" onClick={handleSignOut}>
			Cerrar sesión
		</Button>
	);
};

export default Signout;

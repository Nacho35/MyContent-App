import { Button } from "flowbite-react";
import { signOut } from "next-auth/react";

const Signout = () => {
	return (
		<Button
			className="flex"
			color="failure"
			onClick={() => signOut({ callbackUrl: "/" })}>
			Cerrar sesión
		</Button>
	);
};

export default Signout;

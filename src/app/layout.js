import { Inter } from "next/font/google";
import { MenuProvider } from "./contexts/MenuContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "State-App",
	description: "App para el manejo de cambios de estado.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<MenuProvider>
				<body className={inter.className}>{children}</body>
			</MenuProvider>
		</html>
	);
}

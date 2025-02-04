"use client";
import Signout from "@/pages/api/auth/signOut";
import { collection, onSnapshot } from "firebase/firestore";
import { Button, Drawer, Navbar, TextInput } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../utils/firebaseConfig";
import Card from "./Card";

const Nav = () => {
	const { data: session } = useSession();
	const [entries, setEntries] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "formEntries"),
			(querySnapshot) => {
				const entriesData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				entriesData.sort(
					(a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
				);

				setEntries(entriesData);
			}
		);

		return () => unsubscribe();
	}, []);

	const handleClose = () => setIsOpen(false);

	const filteredEntries = entries.filter((entry) =>
		Object.values(entry).some((field) => {
			if (!isNaN(field)) {
				return String(field).toString() === searchTerm.toString();
			}
			return String(field).toLowerCase().includes(searchTerm.toLowerCase());
		})
	);

	return (
		<Navbar className="bg-gray-600 flex justify-between p-4 w-full">
			<div className="flex items-center justify-center">
				<Button color="success" onClick={() => setIsOpen(true)}>
					Closer Log
				</Button>
			</div>
			<Drawer open={isOpen} onClose={handleClose} position="left">
				<Drawer.Header title="Logs" />
				<TextInput
					type="text"
					placeholder="Buscar..."
					onChange={(e) => setSearchTerm(e.target.value)}
					className="mb-4"
				/>
				<Drawer.Items>
					<div>
						{filteredEntries.map((entry) => (
							<Card key={entry.id} entry={entry} />
						))}
					</div>
				</Drawer.Items>
			</Drawer>
			{session && <Signout />}
		</Navbar>
	);
};

export default Nav;

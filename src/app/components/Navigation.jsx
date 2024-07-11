/* eslint-disable @next/next/no-img-element */
"use client";

import { Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import StateSelectionModal from "../components/Modal";
import { useMenu } from "../contexts/MenuContext";
import clock from "/public/clock.svg";

const Navigation = () => {
	const { setMenuOpen, selectedState, setSelectedState } = useMenu();
	const [shouldAutoOpen, setShouldAutoOpen] = useState(false);

	useEffect(() => {
		if (shouldAutoOpen) {
			setMenuOpen(true);
			setShouldAutoOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldAutoOpen]);

	const handleStateSelection = (state) => {
		setSelectedState(state);
		setShouldAutoOpen(true);
	};

	return (
		<Navbar fluid className="bg-blue-500 p-4">
			<Image src={clock} alt="logo" width={50} height={50} />
			<Navbar.Toggle />
			<Navbar.Collapse className="mr-6">
				<Dropdown
					inline
					arrowIcon={false}
					label={
						<a
							href="#"
							className="hover:text-white bg-zinc-100 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-opacity-75 px-4 py-2 rounded text-sm font-medium text-black">
							ESTADOS
						</a>
					}>
					<Dropdown.Header className="pointer-events-none uppercase">
						Seleccionar estado
					</Dropdown.Header>
					<Dropdown.Item
						className="uppercase"
						onClick={() => handleStateSelection("contactado")}>
						Contactado
					</Dropdown.Item>
					<Dropdown.Item
						className="uppercase"
						onClick={() => handleStateSelection("esperando")}>
						Esperando respuesta
					</Dropdown.Item>
					<Dropdown.Item
						className="uppercase"
						onClick={() => handleStateSelection("enllamada")}>
						En llamada
					</Dropdown.Item>
					<Dropdown.Item
						className="uppercase"
						onClick={() => handleStateSelection("win")}>
						Win
					</Dropdown.Item>
					<Dropdown.Item
						className="uppercase"
						onClick={() => handleStateSelection("lose")}>
						Lose
					</Dropdown.Item>
				</Dropdown>
			</Navbar.Collapse>
			<StateSelectionModal initialSelectedState={selectedState} />
		</Navbar>
	);
};

export default Navigation;

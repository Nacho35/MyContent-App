"use client";

import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [selectedState, setSelectedState] = useState("");

	return (
		<MenuContext.Provider
			value={{ menuOpen, setMenuOpen, selectedState, setSelectedState }}>
			{children}
		</MenuContext.Provider>
	);
};

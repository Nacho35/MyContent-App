"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useMenu } from "../contexts/MenuContext";
import { updateSheetOnClient } from "../utils/clientUtils";

const StateSelectionModal = ({ initialSelectedState }) => {
	const { menuOpen, selectedState, setMenuOpen, setSelectedState } = useMenu();
	const [newState, setNewState] = useState(initialSelectedState || "");
	const [row, setRow] = useState("");

	useEffect(() => {
		setNewState(selectedState || "");
	}, [selectedState]);

	const handleChange = (e) => {
		setNewState(e.target.value);
	};

	const handleRowChange = (e) => {
		setRow(e.target.value);
	};

	const handleSubmit = async () => {
		if (!newState || !row.trim()) {
			return alert("Por favor, selecciona un estado y una fila.");
		}
		setSelectedState(newState);

		try {
			await updateSheetOnClient(1, newState, row);
			setMenuOpen(false);
		} catch (error) {
			console.error(
				"Error al actualizar el estado y la fila en Google Sheets:",
				error
			);
		}
	};

	return (
		<Modal show={menuOpen} onClose={() => setMenuOpen(false)}>
			<Modal.Header>Actualizar Estado</Modal.Header>
			<Modal.Body>
				<div className="flex justify-center flex-col p-2">
					<label className="mb-2" htmlFor="estado">
						Estado:
					</label>
					<select value={newState} onChange={handleChange}>
						<option value="">Seleccionar estado</option>
						<option value="contactado">Contactado</option>
						<option value="esperando">Esperando respuesta</option>
						<option value="enllamada">En llamada</option>
						<option value="win">Win</option>
						<option value="lose">Lose</option>
					</select>
				</div>
				<div className="flex justify-center flex-col p-2">
					<label className="mb-2" htmlFor="fila">
						Fila:
					</label>
					<input
						id="fila"
						type="number"
						value={row}
						onChange={handleRowChange}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer className="flex justify-between">
				<Button
					variant="secondary"
					color="failure"
					onClick={() => setMenuOpen(false)}>
					Cancelar
				</Button>
				<Button variant="primary" color="success" onClick={handleSubmit}>
					Guardar Cambio
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default StateSelectionModal;

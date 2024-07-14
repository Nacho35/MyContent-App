"use client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { updateGoogleSheet } from "../services/updateSheet";

const Form = () => {
	const [newStates, setNewStates] = useState([]);
	const [row, setRow] = useState("");
	const [column, setColumn] = useState("");

	const handleChange = (e) => {
		setNewStates(e.target.value.split(","));
	};

	const handleRowChange = (e) => {
		setRow(e.target.value);
	};

	const handleColumnChange = (event) => {
		setColumn(event.target.value.toUpperCase());
	};

	const handleSubmit = async () => {
		if (!newStates.length || !row.trim() || !column.trim()) {
			return alert(
				"Por favor, selecciona un estado y especifica una fila y columna."
			);
		}

		const cellRange = `${String.fromCharCode(65 + parseInt(column))}${
			parseInt(row) + 1
		}`;
		const sheetId = "1EwHv2SdCnNVd3IsCTmYBxyoBme4mm0rtxqe0Jbs7wXU";

		try {
			const response = await fetch("/api/token");
			const { accessToken } = await response.json();
			await updateGoogleSheet(sheetId, "data_base", cellRange, accessToken);
		} catch (error) {
			console.error(
				"Error al actualizar el estado y la fila en Google Sheets:",
				error
			);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-blue-600">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<Label className="block mb-2 text-sm font-medium">Estados:</Label>
					<Select
						name="estados"
						id="estados"
						value={newStates.join(",")}
						onChange={handleChange}
						placeholder="Selecciona estados">
						<option value="">Seleccionar estados</option>
						<option value="contactado">Contactado</option>
						<option value="esperando">Esperando respuesta</option>
						<option value="enllamada">En llamada</option>
						<option value="win">Win</option>
						<option value="lose">Lose</option>
					</Select>
				</div>
				<div className="mb-4">
					<Label className="block mb-2 text-sm font-medium">Fila:</Label>
					<TextInput
						type="number"
						id="fila"
						value={row}
						onChange={handleRowChange}
						placeholder="Ingrese la fila"
					/>
				</div>
				<div className="mb-4">
					<Label className="block mb-2 text-sm font-medium">Columna:</Label>
					<TextInput
						type="number"
						id="columna"
						value={column}
						onChange={handleColumnChange}
						placeholder="Ingrese la columna"
					/>
				</div>
				<div className="flex justify-center">
					<Button type="submit" variant="primary" color="success">
						Guardar Cambio
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;

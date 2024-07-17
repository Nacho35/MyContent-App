"use client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateGoogleSheet } from "../services/updateSheet";
import Logo from "./Logo";

const Form = () => {
	const { data: session } = useSession();
	const [newStates, setNewStates] = useState("");
	const [row, setRow] = useState("");
	const [column, setColumn] = useState("");

	const handleChange = (e) => {
		setNewStates(e.target.value);
	};

	const handleRowChange = (e) => {
		setRow(e.target.value);
	};

	const handleColumnChange = (event) => {
		setColumn(event.target.value.toUpperCase());
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!newStates.length || !row.trim() || !column.trim()) {
			return toast.error(
				"¡Por favor, selecciona un estado y especifica una fila y columna! 🚫"
			);
		}

		const range = `${column}${row}`;
		const spreadsheetId = "1EwHv2SdCnNVd3IsCTmYBxyoBme4mm0rtxqe0Jbs7wXU";

		try {
			if (!session || !session.accessToken) {
				throw new Error(
					"Usuario no autenticado o no se encontró el accessToken"
				);
			}

			const accessToken = session.accessToken;

			await updateGoogleSheet(spreadsheetId, range, newStates, accessToken);
			toast.success("Datos guardados exitosamente! ✅");
		} catch (error) {
			console.error(
				"Error al actualizar el estado y la fila en Google Sheets:",
				error
			);
			toast.error("¡Hubo un error al intentar guardar los datos! 😟");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-blue-600">
			<div className="flex flex-col w-full max-w-md px-4 py-8 bg-blue-400 m-4 rounded-lg shadow">
				<form onSubmit={handleSubmit}>
					<Logo />
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Estados:
						</Label>
						<Select
							name="estados"
							id="estados"
							value={newStates}
							onChange={handleChange}
							placeholder="Selecciona estados">
							<option value="">Seleccionar estados</option>
							<option value="Contactado">Contactado</option>
							<option value="Esperando respuesta">Esperando respuesta</option>
							<option value="En llamada">En llamada</option>
							<option value="Win">Win</option>
							<option value="Lose">Lose</option>
						</Select>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Columna:
						</Label>
						<TextInput
							type="text"
							id="columna"
							value={column}
							onChange={handleColumnChange}
							placeholder="Ingrese la columna"
						/>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Fila:
						</Label>
						<TextInput
							type="number"
							id="fila"
							value={row}
							onChange={handleRowChange}
							placeholder="Ingrese la fila"
						/>
					</div>
					<div className="flex justify-center py-4">
						<Button type="submit" variant="primary" color="success">
							Guardar Cambio
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Form;

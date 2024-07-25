/* eslint-disable @next/next/no-img-element */
"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../utils/firebaseConfig";
import Logo from "./Logo";

const Form = () => {
	const [formData, setFormData] = useState({
		telefono: "",
		estado: "",
		llamadasRealizadas: false,
		fechaSeguimiento: "",
		fechaCreacion: "",
		fechaAsignacion: "",
		comentarios: "",
	});

	const { data: session } = useSession();
	const [usuarioLogueado, setUsuarioLogueado] = useState(null);

	useEffect(() => {
		if (session) {
			setUsuarioLogueado(session.user);
		}
	}, [session]);

	useEffect(() => {
		if (usuarioLogueado) {
			setFormData((prevData) => ({
				...prevData,
				usuario: usuarioLogueado.name,
			}));
		}
	}, [usuarioLogueado]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (value === "Seleccionar estados") {
			return;
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleLlamadasRealizadasChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			llamadasRealizadas: e.target.value === "Sí",
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/api/submitForm", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();

			try {
				await addDoc(collection(db, "formEntries"), {
					usuario: usuarioLogueado?.name || "Anónimo",
					telefono: formData.telefono,
					estado: formData.estado,
					llamadasRealizadas: formData.llamadasRealizadas,
					fechaSeguimiento: formData.fechaSeguimiento,
					fechaCreacion: formData.fechaCreacion,
					fechaAsignacion: formData.fechaAsignacion,
					comentarios: formData.comentarios,
					timestamp: serverTimestamp(),
				});

				toast.success("Datos guardados exitosamente! ✅");
			} catch (error) {
				console.error("Error al guardar en Firestore:", error);
				toast.error(
					"¡Hubo un error al intentar guardar los datos en Firestore! 😟"
				);
			}
		} catch (error) {
			console.error(error);
			toast.error("¡Hubo un error al intentar guardar los datos! 😟");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-blue-600">
			<div className="flex flex-col w-full max-w-md px-4 py-8 bg-blue-400 m-4 rounded-lg shadow lg:max-w-xl xl:max-w-xl">
				<form onSubmit={handleSubmit}>
					<Logo />
					<h3 className="text-2xl font-bold text-white my-6 text-center uppercase cursor-default">
						Closer View
					</h3>
					{usuarioLogueado && (
						<div className="mb-4 flex items-center">
							<Label className="block mr-4 text-sm font-medium text-white">
								Closer (Usuario):
							</Label>
							<img
								src={usuarioLogueado.image}
								alt={usuarioLogueado.name}
								className="rounded-full w-10 h-10 mr-2"
							/>
							<span className="text-white cursor-default">
								{usuarioLogueado.name}
							</span>
						</div>
					)}
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Teléfono:
						</Label>
						<TextInput
							type="tel"
							id="telefono"
							name="telefono"
							value={formData.telefono}
							onChange={handleChange}
							placeholder="Ingrese el número de teléfono"
							required
						/>
					</div>
					<div className="flex mb-6 items-center justify-between">
						<Label className="block mr-4 text-sm font-medium text-white">
							Abrir con:
						</Label>
						<button
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							onClick={() =>
								window.open(
									`https://wa.me/${formData.telefono.replace(/\D/g, "")}`,
									"_blank"
								)
							}>
							WhatsApp
						</button>
					</div>
					<div className="flex mb-6 items-center justify-between">
						<Label className="block mr-4 text-sm font-medium text-white">
							Enviar Email:
						</Label>
						<a
							href="mailto:?subject=Asunto&body=Cuerpo%20del%20email"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Correo
						</a>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Fecha de Creación:
						</Label>
						<TextInput
							type="datetime-local"
							id="fechaCreacion"
							name="fechaCreacion"
							required
							value={formData.fechaCreacion}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Fecha de Asignación:
						</Label>
						<TextInput
							type="datetime-local"
							id="fechaAsignacion"
							name="fechaAsignacion"
							required
							value={formData.fechaAsignacion}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Estado:
						</Label>
						<Select
							name="estado"
							id="estados"
							required
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
							Llamada Realizada:
						</Label>
						<Select
							id="llamadasRealizadas"
							name="llamadasRealizadas"
							required
							value={formData.llamadasRealizadas ? "Sí" : "No"}
							onChange={handleLlamadasRealizadasChange}
							placeholder="¿Se realizaron llamadas?">
							<option value="Sí">Sí</option>
							<option value="No">No</option>
						</Select>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Fecha de Seguimiento:
						</Label>
						<TextInput
							type="date"
							id="fechaSeguimiento"
							name="fechaSeguimiento"
							value={formData.fechaSeguimiento}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<Label className="block mb-2 text-sm font-medium text-white">
							Comentarios:
						</Label>
						<Textarea
							id="comentarios"
							name="comentarios"
							value={formData.comentarios}
							onChange={handleChange}
							rows={4}
						/>
					</div>
					<div className="flex justify-between py-4">
						<Button
							onClick={() =>
								setFormData({
									telefono: "",
									estado: "",
									llamadasRealizadas: false,
									fechaSeguimiento: "",
									fechaCreacion: "",
									fechaAsignacion: "",
									comentarios: "",
								})
							}
							variant="secondary"
							color="failure">
							Limpiar
						</Button>
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

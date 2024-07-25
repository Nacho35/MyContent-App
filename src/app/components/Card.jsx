import { Card } from "flowbite-react";

const CardLog = ({ entry }) => {
	return (
		<Card className="bg-blue-500 shadow-xl rounded-lg p-2 mb-3 cursor-default">
			<div>
				<div>
					<h4 className="text-white font-semibold">Fecha de Asignacion:</h4>
					<p className="text-amber-400 font-semibold">
						{new Date(entry.fechaAsignacion).toLocaleString("en-US", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				</div>
				<div className="border-t border-amber-400 pt-2"></div>
				<p className="text-white font-semibold">{entry.usuario}</p>
				<p className="text-white font-semibold">
					{new Date(entry.fechaCreacion).toLocaleString("en-US", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
				<p className="text-red-400 font-semibold">{entry.estado}</p>
			</div>
		</Card>
	);
};

export default CardLog;

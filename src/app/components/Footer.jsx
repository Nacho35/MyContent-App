"use client";
import { Footer } from "flowbite-react";

const Foot = () => {
	return (
		<Footer container className="bg-gray-600 rounded-none cursor-default">
			<div className="flex flex-col justify-center items-center text-center w-full h-full">
				<h3 className="text-zinc-100 font-semibold uppercase">
					Hecho con ❤️ para MyContent
				</h3>
			</div>
		</Footer>
	);
};

export default Foot;

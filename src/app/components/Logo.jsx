import Image from "next/image";
import clock from "/public/clock.svg";

const Logo = () => {
	return (
		<div className="container flex justify-center items-center">
			<Image
				src={clock}
				width={150}
				height={150}
				alt="logo"
				priority
				className="mb-4"
			/>
		</div>
	);
};

export default Logo;

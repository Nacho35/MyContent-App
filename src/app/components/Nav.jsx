"use client";
import Signout from "@/pages/api/auth/Signout";
import { Dropdown, Navbar } from "flowbite-react";
import { useSession } from "next-auth/react";
const Nav = () => {
	const { data: session } = useSession();

	return (
		<Navbar className="bg-blue-600 flex justify-between p-4 w-full">
			<Dropdown
				color="warning"
				label="Usuario"
				className="flex justify-between space-x-2">
				<Dropdown.Header>
					{session && (
						<div className="text-black text-sm">
							{session.user.name}
							<br />
							{session.user.email}
							<br />
						</div>
					)}
				</Dropdown.Header>
			</Dropdown>
			{session && <Signout />}
		</Navbar>
	);
};

export default Nav;

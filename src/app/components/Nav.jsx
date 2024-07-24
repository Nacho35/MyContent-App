"use client";
import Signout from "@/pages/api/auth/signOut";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSession } from "next-auth/react";

const Nav = () => {
	const { data: session } = useSession();

	return (
		<Navbar className="bg-gray-600 flex justify-between p-4 w-full">
			<Dropdown
				color="success"
				arrowIcon={false}
				label={<span className="text-white font-semibold text-sm">Panel</span>}
				className="flex justify-between space-x-2 bg-green-600">
				<Avatar
					rounded
					alt="Profile Picture"
					img={session?.user.image ? session.user.image : "/user.svg"}
					className="mt-2"
				/>
				<Dropdown.Header>
					{session && (
						<div className="text-white font-semibold text-sm cursor-default">
							<span className="flex my-2">Usuario: {session.user.name}</span>
							<span className="flex">Email: {session.user.email}</span>
						</div>
					)}
				</Dropdown.Header>
			</Dropdown>
			{session && <Signout />}
		</Navbar>
	);
};

export default Nav;

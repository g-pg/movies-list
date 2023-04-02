import React from "react";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/?auth=true",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function UserPage() {
	const { data: user } = useCurrentUser();
	console.log(user);
	return (
		<>
			<p>Olá, {user?.name || user?.userName}!</p>
			<button onClick={() => signOut()}>Sign out</button>
		</>
	);
}

import React, { useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/general/Loading/Loading";
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
	const { data: user, isLoading } = useCurrentUser();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<p>Olá, {user.name}!</p>
			<button onClick={() => signOut()}>Sign out</button>
		</>
	);
}

import React from "react";
import { getSession, signOut } from "next-auth/react";

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

export default function index() {
	return (
		<>
			<p>user page</p>
			<button onClick={() => signOut()}>Sign out</button>
		</>
	);
}

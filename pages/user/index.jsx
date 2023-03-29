import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function index() {
	return (
		<>
			<button onClick={() => signOut()}>Logout</button>
			<div>index</div>
		</>
	);
}

import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "./prismadb";

const serverAuth = async (req) => {
	const session = await getSession({ req });
	if (!session.user.email) {
		throw new Error("O usuário não está logado.");
	}

	const currentUser = await prismadb.user.findUnique({
		where: {
			email: session.user.email,
		},
	});

	if (!currentUser) {
		throw new Error("O usuário não está logado.");
	}

	return { currentUser };
};

export default serverAuth;

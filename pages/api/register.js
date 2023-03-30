import bcrypt from "bcrypt";
import prismadb from "@lib/prismadb";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	try {
		const { userName, password } = req.body;
		const existingUser = await prismadb.user.findUnique({
			where: {
				userName,
			},
		});

		if (existingUser) {
			return res.status(422).json({ error: "Este usuário já existe." });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				userName,
				hashedPassword,
			},
		});

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}

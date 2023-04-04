import bcrypt from "bcrypt";
import prismadb from "@lib/prismadb";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}

	try {
		const { name, email, password } = req.body;

		if (!name || !password || !email) {
			return res.status(401).json({ error: "É preciso preencher todos os campos." });
		}
		const existingUser = await prismadb.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return res.status(422).json({ error: "Este e-mail já foi cadastrado." });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		return res.status(200).json(user);
	} catch (error) {
		return res.status(400).end();
	}
}

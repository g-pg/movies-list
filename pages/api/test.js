import prismadb from "@/lib/prismadb";

export default async function handler(req, res) {
	if (req.method === "GET") {
		// get user by userName
		try {
			const { email } = req.query;

			const user = await prismadb.user.findUnique({
				where: {
					email: email,
				},
			});

			if (!user) {
				return res.status(404).json({ error: "O usuário não existe." });
			}
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	if (req.method === "DELETE") {
		const { deleteUser } = req.query;
		if (deleteUser === "delete-all-users") {
			try {
				await prismadb.user.deleteMany({});
				return res
					.status(200)
					.json({ message: "Os usuários foram deletados com sucesso." });
			} catch (error) {
				return res.status(500).json(error);
			}
		}
	}
}

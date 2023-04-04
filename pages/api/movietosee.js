import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
	try {
		const { currentUser } = await serverAuth(req);
		const { movieId } = req.body;
		const list = await prismadb.user.findMany({
			where: {
				email: currentUser.email,
			},
			select: {
				moviesToSee: true,
			},
		});
		console.log(list[0].moviesToSee);
		if (req.method === "POST") {
			const existingMovie = list[0].moviesToSee.indexOf(movieId) !== -1;

			if (existingMovie) {
				return res.status(409).json("Este filme já está na lista.");
			}

			const user = await prismadb.user.update({
				where: {
					email: currentUser.email,
				},
				data: {
					moviesToSee: {
						push: movieId,
					},
				},
			});

			return res.status(200).json("Filme adicionado com sucesso.");
		}

		if (req.method === "GET") {
			return res.status(200).json(list);
		}
	} catch (error) {
		return res.status(400).json(error);
	}
}

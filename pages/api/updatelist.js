import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
	try {
		const { currentUser } = await serverAuth(req);
		const { movieId, listToUpdate } = req.body;

		const list = await prismadb.user.findMany({
			where: {
				email: currentUser.email,
			},
			select: {
				[listToUpdate]: true,
			},
		});
		// ;

		if (req.method === "GET") {
			return res.status(200).json(list);
		}

		const existingMovie = list[0][listToUpdate].indexOf(movieId) !== -1;
		if (req.method === "POST") {
			if (existingMovie) {
				return res.status(409).json("Este filme já está na lista.");
			}

			if (listToUpdate === "moviesToSee") {
				const seenList = await prismadb.user.findMany({
					where: {
						email: currentUser.email,
					},
					select: {
						moviesSeen: true,
					},
				});

				const alreadySeen = await seenList[0].moviesSeen.find(
					(movie) => movie == movieId
				);

				if (alreadySeen) {
					return res.status(409).json("Oops! Parece que você já viu esse filme!");
				}
			}

			const response = await prismadb.user.update({
				where: {
					email: currentUser.email,
				},
				data: {
					[listToUpdate]: {
						push: movieId,
					},
				},
			});

			return res.status(200).json("Filme adicionado com sucesso!");
		}

		if (req.method === "DELETE") {
			if (!existingMovie) {
				return res.status(409).json("Este filme não está na lista.");
			}

			const filteredList = list[0][listToUpdate].filter((id) => id != movieId);

			const response = await prismadb.user.update({
				where: {
					email: currentUser.email,
				},

				data: {
					[listToUpdate]: {
						set: filteredList,
					},
				},
			});
		}

		res.status(200).json("Filme removido com sucesso.");
	} catch (error) {
		console.log(error);
		return res.status(400).json("Oops! Algo deu errado.");
	}
}

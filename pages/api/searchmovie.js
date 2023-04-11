import axios from "axios";

export default async function handler(req, res) {
	const { name, id } = req.query;
	const KEY = process.env.MOVIEDB_KEY;
	let URL;
	console.log("chucrute", id);
	if (name) {
		URL = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${name}`;

		try {
			const movie = await axios.get(URL);
			return res.status(200).json(movie.data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	if (id) {
		const arrayOfIds = id.split(",");

		try {
			const moviePromises = await arrayOfIds.map((id) =>
				axios.get(
					`https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${KEY}&language=pt-BR`
				)
			);
			const responses = await Promise.all(moviePromises);
			const data = responses.map((response) => response.data);
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	if (!id) {
		return res.status(200).json([]);
	}
}

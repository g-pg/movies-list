import axios from "axios";

export default async function handler(req, res) {
	const { name, id } = req.query;
	const KEY = process.env.MOVIEDB_KEY;
	let URL;

	if (name) {
		URL = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${name}`;
	} else if (id) {
		URL = `https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${KEY}`;
	}

	try {
		const movie = await axios.get(URL);
		return res.status(200).json(movie.data);
	} catch (error) {
		return res.status(500).json(error);
	}
}

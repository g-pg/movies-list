import axios from "axios";

export default async function handler(req, res) {
	try {
		const { name } = req.query;
		const KEY = process.env.MOVIEDB_KEY;
		console.log(KEY);
		const movie = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${name}`
		);
		return res.status(200).json(movie.data);
	} catch (error) {
		return res.status(500).json(error);
	}
}

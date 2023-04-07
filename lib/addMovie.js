import axios from "axios";

export default async function addMovie(list, movieId) {
	const URL = `/api/${list}`;
	movieId = movieId.toString();
	try {
		const movie = await axios.post(URL, { movieId: movieId });

		return movie;
	} catch (error) {
		console.log(error.message);
	}
}

import axios from "axios";

export default async function addMovie(list, movieId, listToUpdate) {
	const URL = `/api/${list}`;
	movieId = movieId.toString();
	try {
		const movie = await axios.post(URL, { movieId: movieId, listToUpdate: listToUpdate });

		return movie;
	} catch (error) {
		throw new Error(error.response.data);
	}
}

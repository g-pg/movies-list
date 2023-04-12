import axios from "axios";

export default async function addMovie(movieId, listToUpdate) {
	movieId = movieId.toString();
	try {
		const movie = await axios.post("/api/updatelist", {
			movieId: movieId,
			listToUpdate: listToUpdate,
		});

		return movie;
	} catch (error) {
		throw new Error(error.response.data);
	}
}

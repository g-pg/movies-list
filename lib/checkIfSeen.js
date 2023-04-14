export function checkIfSeen(user, movieId) {
	return user.moviesSeen.find((id) => id == movieId);
}

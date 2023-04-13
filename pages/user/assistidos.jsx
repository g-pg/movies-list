import React from "react";
import PrimaryLayout, { PageTitle } from "@/components/general/PrimaryLayout/PrimaryLayout";
import MoviesGrid from "@/components/general/MoviesGrid/MoviesGrid";
import Loading from "@/components/general/Loading/Loading";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMoviesInfo from "@/hooks/useMoviesInfo";
import { useSession } from "next-auth/react";

export default function AssistidosPage() {
	const { data: user, isLoading, mutate } = useCurrentUser();
	const moviesList = "moviesSeen";
	const {
		data: movies,
		isLoading: loadingMovies,
		mutate: mutateMovies,
	} = useMoviesInfo(user && user[moviesList]);

	const { status: authStatus } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/?auth=true");
		},
	});

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<PrimaryLayout>
				<div className="container wrapper">
					<PageTitle>Filmes assistidos</PageTitle>

					<div className="movies-grid">
						<MoviesGrid
							movies={movies}
							isLoading={loadingMovies}
							mutate={mutateMovies}
							moviesList={moviesList}
						/>
					</div>
				</div>
			</PrimaryLayout>
			<style jsx>{`
				.wrapper {
					display: flex;
					flex-direction: column;
					gap: 3rem;
				}

				.movies-grid-wrapper {
				}

				.movies-grid {
					min-height: 300px;
					width: 80%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
				}

				@media (max-width: 780px) {
					.movies-grid-wrapper {
						width: 100%;
					}
					.movies-grid {
						width: 100%;
					}
				}
			`}</style>
		</>
	);
}

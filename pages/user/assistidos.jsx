import React from "react";
import PrimaryLayout, {
	PageTitle,
	PageSubtitle,
} from "@/components/general/PrimaryLayout/PrimaryLayout";
import MoviesGrid from "@/components/general/MoviesGrid/MoviesGrid";
import Loading from "@/components/general/Loading/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMoviesInfo from "@/hooks/useMoviesInfo";

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/?auth=true",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function AssistidosPage() {
	const { data: user, isLoading, mutate } = useCurrentUser();
	const moviesList = "moviesSeen";
	const {
		data: movies,
		isLoading: loadingMovies,
		mutate: mutateMovies,
	} = useMoviesInfo(user && user[moviesList]);

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

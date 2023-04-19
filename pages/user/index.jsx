import React from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/general/Loading/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import PrimaryLayout, {
	Highlight,
	PageTitle,
	PageSubtitle,
} from "@/components/general/PrimaryLayout/PrimaryLayout";
import SearchBar from "@/components/general/SearchBar/SearchBar";

import MoviesGrid from "@/components/general/MoviesGrid/MoviesGrid";
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

export default function UserPage() {
	const { data: user, isLoading, mutate } = useCurrentUser();
	const moviesList = "moviesToSee";

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
			<PrimaryLayout user={user}>
				<div className="container wrapper">
					<PageTitle>Olá, {user?.name.split(" ")[0]}!</PageTitle>

					{movies?.length < 1 ? (
						<PageSubtitle>Guarde um filme na sua lista!</PageSubtitle>
					) : (
						<PageSubtitle>
							Você tem <Highlight>{movies?.length}</Highlight> filme
							{movies?.length > 1 ? "s" : ""} para assistir!
						</PageSubtitle>
					)}
					<SearchBar user={user} mutate={mutateMovies} movies={movies} />
					<div className="movies-grid">
						<MoviesGrid
							user={user}
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

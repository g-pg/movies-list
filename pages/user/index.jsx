import React, { useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/general/Loading/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import PrimaryLayout from "@/components/general/PrimaryLayout/PrimaryLayout";

import PageTitle, { PageSubTitle } from "@/components/general/PageTitle/PageTitle";
import SearchBar from "@/components/general/SearchBar/SearchBar";

import MoviesGrid from "@/components/general/MoviesGrid/MoviesGrid";
import useMoviesInfo from "@/hooks/useMoviesInfo";
import PageText from "@/components/general/PageParagraph/PageParagraph";

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
					<PageSubTitle>
						{movies?.length < 1
							? "Adicione o primeiro filme à sua lista!"
							: `Você já tem ${
									// <span
									// 	style={{
									// 		color: "var(--cl-accent)",
									// 		fontWeight: "700",
									// 	}}
									// >
									movies?.length
									// </span>
							  } filme${movies?.length > 1 ? "s" : ""} para assistir!`}
					</PageSubTitle>
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

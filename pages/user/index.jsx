import React, { useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/general/Loading/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import PrimaryLayout from "@/components/general/PrimaryLayout/PrimaryLayout";

import PageTitle from "@/components/general/PageTitle/PageTitle";
import SearchBar from "@/components/general/SearchBar/SearchBar";

import MoviesGrid from "@/components/general/MoviesGrid/MoviesGrid";

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
	console.log(user);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<PrimaryLayout user={user}>
				<div className="container wrapper">
					<PageTitle>Olá, {user?.name.split(" ")[0]}!</PageTitle>
					<SearchBar user={user} />
					<div className="movies-grid">
						<MoviesGrid user={user} list="moviesToSee" />
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

				@media (max-width: 780px) {
					.movies-grid-wrapper {
						width: 100%;
					}
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
			`}</style>
		</>
	);
}

import React, { useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/general/Loading/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import PrimaryLayout from "@/components/general/PrimaryLayout/PrimaryLayout";

import PageTitle from "@/components/general/PageTitle/PageTitle";
import SearchBar from "@/components/general/SearchBar/SearchBar";
import { debounce } from "lodash";

import QueryBox from "@/components/pages/User/QueryBox/QueryBox";
import useClickOutside from "@/hooks/useClickOutside";
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
	const { data: user, isLoading } = useCurrentUser();
	console.log(user);

	const [showResults, setShowResults] = useState(false);
	const { ref: queryBoxRef } = useClickOutside(setShowResults);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchingMovies, setSearchingMovies] = useState(false);
	const [queryMoviesList, setQueryMoviesList] = useState([]);
	function handleChange(e) {
		setSearchQuery(e.target.value);
	}

	useEffect(() => {
		const query = searchQuery.replace(/ /g, "+");
		const amountToShow = 10;

		const searchMovieByName = debounce(async () => {
			try {
				setSearchingMovies(true);
				const res = await fetch(`../api/searchmovie?name=${query}`);
				const data = await res.json();

				let firstNMovies = [];

				for (let i = 0; i < amountToShow && i < data.results.length; i++) {
					firstNMovies.push(data.results[i]);
				}

				console.log(firstNMovies);
				setQueryMoviesList(firstNMovies);
				setSearchingMovies(false);
				setShowResults(true);
			} catch (error) {
				console.log(error);
			}
		}, 500);

		console.log(query);
		if (query.length > 2) {
			searchMovieByName();
		} else if (query.length === 0) {
			setQueryMoviesList([]);
		}

		return () => {
			searchMovieByName.cancel();
		};
	}, [searchQuery]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<PrimaryLayout user={user}>
				<div className="container wrapper">
					<PageTitle>Olá, {user?.name.split(" ")[0]}!</PageTitle>
					<div
						className={"search-box"}
						onClick={() => setShowResults(true)}
						ref={queryBoxRef}
					>
						<SearchBar
							onChange={handleChange}
							value={searchQuery}
							loading={searchingMovies}
						/>

						{showResults && queryMoviesList.length > 0 && (
							<QueryBox list={queryMoviesList} />
						)}
					</div>
					<div className="movies-grid-wrapper">
						<div className="movies-grid">
							<MoviesGrid />
						</div>
					</div>
				</div>
			</PrimaryLayout>
			<style jsx>{`
				.wrapper {
					display: flex;
					flex-direction: column;
					gap: 3rem;
				}

				.search-box {
					margin: 0 auto;
					position: relative;
					max-width: 600px;
					width: 100%;
				}
				.movies-grid-wrapper {
					min-height: 300px;
					width: 70%;
					margin: 0 auto;
				}

				@media (max-width: 780px) {
					.movies-grid-wrapper {
						width: 100%;
					}
				}
				.movies-grid {
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;
					height: 100%;
				}
			`}</style>
		</>
	);
}

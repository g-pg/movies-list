import React, { useEffect, useState } from "react";
import styles from "./MoviesGrid.module.css";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function MoviesGrid({ list, user }) {
	const userSavedMovies = user[list];

	const ids = userSavedMovies.join(",");
	const { data: movies, isLoading } = useSWR(`/api/searchmovie?id=${ids}`, fetcher);
	const [moviesList, setMoviesList] = useState(movies || []);

	useEffect(() => {
		setMoviesList(movies);
	}, [movies]);

	if (isLoading) {
		return <Loading />;
	}
	if (!movies) {
		return (
			<p style={{ color: "var(--cl-light-grey" }}>
				Você ainda não tem filmes nesta lista.
			</p>
		);
	}

	return (
		<div style={{ display: "flex", flexWrap: "wrap" }}>
			{movies.map((el) => {
				return (
					<img
						key={el.id}
						src={`https://image.tmdb.org/t/p/w154${el.poster_path}`}
						alt=""
					/>
				);
			})}
		</div>
	);
}

export function movieCard({ list }) {}

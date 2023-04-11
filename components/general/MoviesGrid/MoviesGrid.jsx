import React, { useEffect, useState } from "react";

import styles from "./MoviesGrid.module.css";
import Loading from "../Loading/Loading";
import Image from "next/image";
import axios from "axios";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import { IoMdTrash, IoMdEye, IoIosCheckbox, IoIosEye } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";

export default function MoviesGrid({ isLoading, mutate, movies, moviesList }) {
	if (isLoading) {
		return <Loading />;
	}

	if (!movies || movies.length < 1) {
		return (
			<p style={{ color: "var(--cl-light-grey" }}>
				Você ainda não tem filmes nesta lista.
			</p>
		);
	}

	async function deleteMovie(id, caller) {
		try {
			const newList = movies.filter((movie) => movie.id != id);
			id = id.toString();
			mutate(newList, false);
			const res = await axios.delete("/api/updatelist", {
				data: { movieId: id, listToUpdate: moviesList },
			});

			caller !== "addToSeen" && toast.success(res.data);
		} catch (error) {
			console.log(error);
			toast.error("Oops! Algo deu errado.");
		}
	}

	async function addToSeen(id) {
		try {
			await deleteMovie(id, "addToSeen");
			id = id.toString();

			const res = await axios.post("/api/updatelist", {
				movieId: id,
				listToUpdate: "moviesSeen",
			});
			toast.success("Assistido!");
		} catch (error) {
			console.log(error);
			toast.error("Oops! Algo deu errado.");
		}
	}

	return (
		<div className={styles.movieGrid}>
			{movies.map((movie) => {
				return (
					<MovieCard
						key={movie.id}
						movie={movie}
						deleteMovie={deleteMovie}
						addToSeen={addToSeen}
						moviesList={moviesList}
					/>
				);
			})}
		</div>
	);
}

export function MovieCard({ movie, deleteMovie, addToSeen, moviesList }) {
	// const btnColor = { color: "var(--cl-bg)" };
	return (
		<>
			<div className={styles.cardWrapper}>
				<div className={styles.poster}>
					<Image
						src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
						width="154"
						height="223"
						// fill
						// object-fit="contain"
						alt={movie.title}
					/>
				</div>
				<div className={styles.infoWrapper}>
					<h3>{movie.title}</h3>
					{/* <p>{movie.release_date.split("-")[0]}</p> */}
				</div>
				<div className={styles.btnsWrapper}>
					<SecondaryBtn
						as="btn"
						onClick={() => deleteMovie(movie.id)}
						// size={"1.5rem"}
						icon={<IoMdTrash />}
						title="Remover da lista"
						// style={btnColor}
					/>
					{moviesList != "moviesSeen" && (
						<SecondaryBtn
							as="btn"
							// onClick={() => deleteMovie(movie.id)}
							icon={<IoIosCheckbox />}
							// size={"1.5rem"}
							title="Marcar como assistido"
							onClick={() => addToSeen(movie.id)}
							// style={btnColor}
						/>
					)}
					<SecondaryBtn
						as="btn"
						// onClick={() => deleteMovie(movie.id)}
						// style={btnColor}
						icon={<IoIosEye />}
						// size={"1.5rem"}
						title="Mais informações"
					/>
				</div>
			</div>
		</>
	);
}

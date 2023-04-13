import React, { useState } from "react";

import styles from "./MoviesGrid.module.css";
import Loading from "../Loading/Loading";
import Image from "next/image";
import axios from "axios";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import { IoMdTrash, IoIosCheckbox, IoIosInformationCircle } from "react-icons/io";
import { toast } from "react-hot-toast";

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
	const [showBtns, setShowBtns] = useState(false);

	return (
		<>
			<div
				className={styles.cardWrapper}
				onMouseEnter={() => setShowBtns(true)}
				onMouseLeave={() => setShowBtns(false)}
			>
				<div className={styles.poster}>
					{movie.poster_path ? (
						<Image
							src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
							width="256"
							height="384"
							alt={movie.title}
						/>
					) : (
						<div className={styles.notFound}>
							<p>Poster indisponível.</p>
						</div>
					)}
					{showBtns && (
						<div className={styles.btnsWrapper}>
							{moviesList != "moviesSeen" && (
								<SecondaryBtn
									as="btn"
									icon={<IoIosCheckbox size="1.5rem" />}
									title="Marcar como assistido"
									onClick={() => addToSeen(movie.id)}
									content={"Assistido"}
									size="0.7rem"
									contrast="true"
								/>
							)}
							<SecondaryBtn
								as="link"
								href={`/movie/${movie.id}`}
								icon={<IoIosInformationCircle size={"1.5rem"} />}
								title="Mais informações"
								content={"Informações"}
								size={"0.7rem"}
								contrast="true"
							/>
							<SecondaryBtn
								as="btn"
								onClick={() => deleteMovie(movie.id)}
								icon={<IoMdTrash size="1.5rem" />}
								title="Remover da lista"
								content={"Remover"}
								size={"0.7rem"}
								contrast="true"
							/>
						</div>
					)}
				</div>
				<div className={styles.infoWrapper}>
					<h3>{movie.title}</h3>
				</div>
			</div>
		</>
	);
}

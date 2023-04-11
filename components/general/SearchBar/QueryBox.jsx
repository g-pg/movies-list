import React from "react";
import styles from "./QueryBox.module.css";
import Image from "next/image";
import SecondaryBtn from "@components/general/SecondaryBtn/SecondaryBtn";
import { MdAddBox, MdArrowForward, MdCalendarMonth, MdStar } from "react-icons/md";
import addMovie from "@/lib/addMovie";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function QueryBox({ list, movies, setShowResults, mutate }) {
	function sliceDescription(text) {
		if (text.length > 130) {
			let lastSpaceIndex = 0;
			lastSpaceIndex = text.indexOf(" ", 115);

			let regex = /[,.:;!?]/;

			if (regex.test(text[lastSpaceIndex - 1])) {
				lastSpaceIndex -= 1;
			}

			let slicedText = text.slice(0, lastSpaceIndex);
			slicedText = slicedText + "...";
			return slicedText;
		}
		return text;
	}

	async function handleAddMovie(id, movieInfo) {
		try {
			let newMoviesList = movies ? [...movies, movieInfo] : [movieInfo];
			mutate(newMoviesList, false);
			id = id.toString();
			const res = await axios.post("/api/updatelist", {
				movieId: id,
				listToUpdate: "moviesToSee",
			});
			toast.success(res.data);
			setShowResults(false);
		} catch (error) {
			mutate(movies, false);
			toast.error(error.response.data);
		}
	}

	return (
		<>
			<div className={styles.wrapper}>
				{list.map((el) => {
					return (
						<div className={styles.movieBox} key={el.id}>
							{el.poster_path ? (
								<Image
									className={styles.moviePoster}
									width="154"
									height="231"
									src={`https://image.tmdb.org/t/p/w154${el.poster_path}`}
									alt={el.title}
								/>
							) : (
								<div className={styles.moviePoster}>
									<p aria-hidden="true">Poster indisponível</p>
								</div>
							)}
							<div className={styles.content}>
								<div className={styles.movieInfo}>
									<div className={styles.movieDetails}>
										<h3>{el.title}</h3>
										<p>
											<MdCalendarMonth />{" "}
											{el.release_date.split("-")[0]}
										</p>
										<p>
											<MdStar /> {el.vote_average.toFixed(1)}
										</p>
									</div>
									<p>{sliceDescription(el.overview)}</p>
								</div>
								<div className={styles.actions}>
									<SecondaryBtn
										as="btn"
										icon={<MdAddBox />}
										size="2rem"
										style={{ color: "var(--cl-accent)" }}
										onClick={() => handleAddMovie(el.id, el)}
									/>

									<SecondaryBtn
										as="link"
										content="Detalhes"
										icon={<MdArrowForward />}
										size="0.8rem"
										href={`/movie/${el.id}`}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

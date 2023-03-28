import styles from "./Carroussel.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carroussel({ popularMovies }) {
	console.log(popularMovies.results);

	return (
		<section className={styles.section}>
			{popularMovies.results.map((el) => {
				console.log(el.poster_Path);
				return (
					<Image
						width="154"
						height="231"
						src={`https://image.tmdb.org/t/p/w154${el.poster_path}`}
						alt={el.title}
						key={el.id}
					/>
				);
			})}
			)
		</section>
	);
}

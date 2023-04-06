import React from "react";
import styles from "./QueryBox.module.css";
import Image from "next/image";
import SecondaryBtn from "@components/general/SecondaryBtn/SecondaryBtn";
import { MdAddBox, MdArrowForward } from "react-icons/md";
export default function QueryBox({ list }) {
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

	return (
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
								<p>Poster indisponível.</p>
							</div>
						)}
						<div className={styles.content}>
							<div className={styles.movieInfo}>
								<h3>{el.title}</h3>
								<p>{sliceDescription(el.overview)}</p>
							</div>
							<div className={styles.actions}>
								<SecondaryBtn
									as="btn"
									icon={<MdAddBox />}
									size="2rem"
									style={{ color: "var(--cl-accent)" }}
								/>

								<SecondaryBtn
									as="link"
									content="Ler mais"
									icon={<MdArrowForward />}
									size="0.8rem"
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

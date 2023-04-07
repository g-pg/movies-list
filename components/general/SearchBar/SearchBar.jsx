import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
import Loading from "../Loading/Loading";
import QueryBox from "./QueryBox";
import useClickOutside from "@/hooks/useClickOutside";
import { debounce } from "lodash";

export default function SearchBar({ placeholder, user }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchingMovies, setSearchingMovies] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const { ref: queryBoxRef } = useClickOutside(setShowResults);

	const [queryMoviesList, setQueryMoviesList] = useState([]);
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

		if (query.length > 2) {
			searchMovieByName();
		} else if (query.length === 0) {
			setQueryMoviesList([]);
		}

		return () => {
			searchMovieByName.cancel();
		};
	}, [searchQuery]);

	function handleChange(e) {
		setSearchQuery(e.target.value);
	}

	return (
		<>
			{" "}
			<div className={"search-box"} onClick={() => setShowResults(true)} ref={queryBoxRef}>
				<div className={styles.wrapper}>
					<input
						onChange={handleChange}
						value={searchQuery}
						placeholder={placeholder || "Buscar"}
					/>
					<div className={styles.magnifier}>
						{searchingMovies ? (
							<Loading
								// style={{ width: "35px", transform: "translate(10px, -90px)" }}
								style={{
									width: "100%",
									height: "100%",
									transform: "scale(2)",
								}}
							/>
						) : (
							<BsSearch />
						)}
					</div>
				</div>
				{showResults && queryMoviesList.length > 0 && (
					<QueryBox list={queryMoviesList} />
				)}
			</div>
			<style jsx>{`
				.search-box {
					margin: 0 auto;
					position: relative;
					max-width: 600px;
					width: 100%;
				}
			`}</style>
		</>
	);
}

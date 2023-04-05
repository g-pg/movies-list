import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
import Loading from "../Loading/Loading";

export default function SearchBar({ onChange, value, placeholder, loading }) {
	return (
		<>
			<div className={styles.wrapper}>
				<input
					onChange={onChange}
					value={value}
					placeholder={placeholder || "Buscar"}
				/>
				<div className={styles.magnifier}>
					{loading ? (
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
			<style jsx>{``}</style>
		</>
	);
}

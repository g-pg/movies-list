import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
export default function SearchBar({ onChange, value, placeholder }) {
	return (
		<>
			<div className={styles.wrapper}>
				<input
					onChange={onChange}
					value={value}
					placeholder={placeholder || "Buscar"}
				/>
				<BsSearch className={styles.magnifier} />
			</div>
			<style jsx>{``}</style>
		</>
	);
}

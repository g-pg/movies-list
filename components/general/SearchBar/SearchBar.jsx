import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";
export default function SearchBar({ onChange, value }) {
	return (
		<>
			<div className={styles.wrapper}>
				<input onChange={onChange} value={value} />
				<BsSearch className={styles.magnifier} />
			</div>
			<style jsx>{``}</style>
		</>
	);
}

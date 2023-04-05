import Link from "next/link";
import React from "react";
import styles from "./SecondaryBtn.module.css";
export default function SecondaryBtn({ type, icon, href, onClick, content }) {
	if (type === "btn") {
		return (
			<button className={styles.btn} onClick={onClick}>
				{icon}
				{content}
			</button>
		);
	}

	if (type === "link") {
		return (
			<>
				<Link className={styles.link} href={href || "#"} target="_blank">
					{content}
					{icon}
				</Link>
			</>
		);
	}
}

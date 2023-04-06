import Link from "next/link";
import React from "react";
import styles from "./SecondaryBtn.module.css";
export default function SecondaryBtn({ as, icon, href, onClick, content, size, style }) {
	if (as === "btn") {
		return (
			<button
				className={styles.btn}
				onClick={onClick}
				style={{ fontSize: size, ...style }}
			>
				{icon}
				{content}
			</button>
		);
	}

	if (as === "link") {
		return (
			<>
				<Link
					className={styles.link}
					href={href || "#"}
					target="_blank"
					style={{ fontSize: size, ...style }}
				>
					{icon}
					{content}
				</Link>
			</>
		);
	}
}

import Link from "next/link";
import React from "react";
import styles from "./QueryBox.module.css";
export default function ActionBtn({ type, icon, href, action, content }) {
	if (type === "btn") {
		return (
			<button className={styles.btn} action={action}>
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

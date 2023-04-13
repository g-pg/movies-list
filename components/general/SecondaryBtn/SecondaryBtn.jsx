import Link from "next/link";
import React from "react";
import styles from "./SecondaryBtn.module.css";
import classNames from "classnames";
export default function SecondaryBtn({
	as,
	icon,
	href,
	onClick,
	title,
	content,
	size,
	style,
	target,
	contrast,
}) {
	if (as === "btn") {
		return (
			<button
				className={classNames(styles.btn, contrast && styles.contrast)}
				onClick={onClick}
				style={{ fontSize: size, ...style }}
				title={title}
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
					className={classNames(styles.btn, contrast && styles.contrast)}
					href={href || "#"}
					target={target}
					style={{ fontSize: size, ...style }}
				>
					{icon}
					{content}
				</Link>
			</>
		);
	}
}

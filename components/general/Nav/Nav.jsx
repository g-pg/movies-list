import { useEffect, useState } from "react";

import Link from "next/link";

import styles from "./Nav.module.css";

import classNames from "classnames";

import Credits from "../Credits/Credits";
import useClickOutside from "@/hooks/useClickOutside";

export default function Nav({ user }) {
	const homeLink = user ? "/user" : "/";
	return (
		<>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link href={homeLink}>{user ? "Minha lista" : "Home"}</Link>
					</li>
					{user && (
						<li>
							<Link href="/user/assistidos">Assistidos</Link>
						</li>
					)}
					<li>
						<Link href="/sobre">Sobre</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
export function DesktopNav({ user }) {
	return (
		<div className={styles.desktopNav}>
			<Nav user={user} />
		</div>
	);
}

export function MobileNav({ user, headerHeight }) {
	const [showBurger, setShowBurger] = useState(false);
	const { ref: burgerMenuRef } = useClickOutside(setShowBurger);
	useEffect(() => {
		showBurger
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "auto");
	}, [showBurger]);
	useEffect(() => {}, [showBurger]);
	return (
		<div
			ref={burgerMenuRef}
			className={classNames(styles.burgerWrapper, showBurger && styles.active)}
		>
			<button
				className={classNames(styles.burgerBtn)}
				onClick={() => setShowBurger((prev) => !prev)}
				aria-label="Menu"
			>
				<div className={classNames(styles.burgerLine)}></div>
			</button>
			<div
				className={classNames(styles.burgerMenu, styles.active)}
				style={{
					top: `${headerHeight - 1}px`,
					height: `calc(100dvh - ${headerHeight}px)`,
				}}
			>
				<div onClick={() => setShowBurger((prev) => !prev)}>
					<Nav user={user} />
				</div>
				<div style={{ marginTop: "auto" }}>
					<Credits />
				</div>
			</div>
		</div>
	);
}

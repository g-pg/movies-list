import { useContext, useEffect, useState } from "react";
import { AuthModalContext } from "@/context/AuthModalContext";
import Link from "next/link";

import styles from "./Nav.module.css";
import PrimaryBtn from "@/components/general/PrimaryBtn/PrimaryBtn";

import classNames from "classnames";

import Credits from "../Credits/Credits";
import useClickOutside from "@/hooks/useClickOutside";
export default function Nav({ user }) {
	const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);
	const homeLink = user ? "/user" : "/";
	return (
		<>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link href={homeLink}>Home</Link>
					</li>
					<li>
						<Link href="/sobre">Sobre</Link>
					</li>
					{user && (
						<li>
							<Link href="/assistidos">Assistidos</Link>
						</li>
					)}
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

export function MobileNav({ user }) {
	const [showBurger, setShowBurger] = useState(false);
	const { ref: burgerMenuRef } = useClickOutside(setShowBurger);
	useEffect(() => {
		showBurger
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "auto");
	}, [showBurger]);
	useEffect(() => {
		console.log(showBurger);
	}, [showBurger]);
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
			{/* {showBurger && ( */}
			<div className={classNames(styles.burgerMenu, styles.active)}>
				<Nav user={user} />
				<div style={{ marginTop: "auto" }}>
					<Credits />
				</div>
			</div>
		</div>
	);
}

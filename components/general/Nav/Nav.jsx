import styles from "./Nav.module.css";

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<a href="#">Login</a>
				</li>
				<li>
					<a href="#">Sobre</a>
				</li>
			</ul>
		</nav>
	);
}

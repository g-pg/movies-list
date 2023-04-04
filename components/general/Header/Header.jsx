import Link from "next/link";
import Nav from "../Nav/Nav";
// import styles from "./Header.module.css";

export default function Header({ user }) {
	return (
		<>
			<header>
				<div className="container header-wrapper">
					<Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
						<h1>Muvi</h1>
					</Link>
					<Nav user={user} />
				</div>
			</header>

			<style jsx>{`
				.header-wrapper {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 2rem;
					padding-block: 1rem;
				}

				h1 {
					color: var(--cl-accent);
					font-size: 1.2rem;
				}
			`}</style>
		</>
	);
}

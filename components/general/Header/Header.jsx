import Nav from "../Nav/Nav";
// import styles from "./Header.module.css";

export default function Header() {
	return (
		<>
			<header>
				<div className="container header-wrapper">
					<h1>Muvi</h1>
					<Nav />
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

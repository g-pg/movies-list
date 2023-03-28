import React from "react";

export default function Footer() {
	return (
		<>
			<footer>
				<div className="container footer-wrapper">Footer</div>
			</footer>

			<style jsx>{`
				footer {
					margin-top: 2rem;
				}

				.footer-wrapper {
					display: flex;
					justify-content: center;
					align-items: center;
					padding-block: 2rem;
				}
			`}</style>
		</>
	);
}

import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
export default function Credits({}) {
	return (
		<>
			<div className="credits">
				<p>Desevolvido por Gabriel Gusso</p>
				<div className="social">
					<a href="https://www.linkedin.com/in/ggusso/" target="_blank">
						<FaLinkedin />
					</a>

					<a href="https://github.com/g-pg" target="_blank">
						<FaGithub />
					</a>
				</div>
			</div>
			<style jsx>{`
				.credits {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;
				}

				.credits p {
					font-size: 0.6rem;
				}

				.social {
					display: flex;
					align-items: center;
					gap: 1rem;
				}
				.social a {
					color: var(--cl-light-grey);
					font-size: 1rem;
				}

				.social a:hover {
					color: var(--cl-main-text);
				}

				.social a {
					font-size: 1.2rem;
				}
			`}</style>
		</>
	);
}

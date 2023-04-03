import Image from "next/image";
import React from "react";
import TmdbLogo from "@/public/tmdb-logo.svg";
import { FaLinkedin, FaGithub } from "react-icons/fa";
export default function Footer() {
	return (
		<>
			<footer>
				<div className="container footer-wrapper">
					<div className="tmdb-logo">
						<a href="https://www.themoviedb.org/" target="__blank">
							<TmdbLogo />
						</a>
					</div>
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
				</div>
			</footer>

			<style jsx>{`
				footer {
					margin-top: auto;
					background: black;
				}

				.footer-wrapper {
					display: flex;
					justify-content: center;
					align-items: center;
					padding-block: 1rem;
					gap: 2rem;
				}

				.tmdb-logo {
					width: 50px;
				}

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
					color: var(--text);
					font-size: 1rem;
					opacity: 0.8;
				}

				.social a:hover {
					opacity: 1;
				}
			`}</style>
		</>
	);
}

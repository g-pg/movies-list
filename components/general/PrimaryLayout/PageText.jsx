import React from "react";

export function PageTitle({ children, style }) {
	return (
		<>
			<h2 style={style}>{children}</h2>

			<style jsx>{`
				h2 {
					font-size: 2.5rem;
					color: var(--cl-text);
					text-align: center;
					margin-bottom: 2rem;
				}

				@media (max-width: 768px) {
					h2 {
						font-size: 1.5rem;
					}
				}
			`}</style>
		</>
	);
}

export function PageSubtitle({ children, style }) {
	return (
		<>
			<h3 style={style}>{children}</h3>

			<style jsx>{`
				h3 {
					font-size: 0.8rem;
					color: var(--cl-text);
					text-align: center;
					margin-top: -4.5rem;
					// margin-bottom: 2rem;
					font-weight: 400;
				}

				@media (max-width: 768px) {
					h3 {
						font-size: 0.7rem;
					}
				}
			`}</style>
		</>
	);
}

export function PageText({ children, style }) {
	return (
		<>
			<p style={style}>{children}</p>

			<style jsx>{`
				p {
					color: var(--cl-text);
					width: 80%;
					margin: 0 auto;
					margin-bottom: 1rem;
				}
			`}</style>
		</>
	);
}

export function Highlight({ children, style }) {
	return (
		<>
			<span style={style}>{children}</span>
			<style jsx>{`
				span {
					color: var(--cl-accent);
					fontweight: 700;
				}
			`}</style>
		</>
	);
}

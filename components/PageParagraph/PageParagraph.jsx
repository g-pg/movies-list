import React from "react";

export default function PageText({ children, style }) {
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

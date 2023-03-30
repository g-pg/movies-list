import React from "react";

export default function PrimaryBtn({ children, style, onClick, type }) {
	return (
		<>
			<button style={style} onClick={onClick} type={type}>
				{children}
			</button>
			<style jsx>
				{`
					button {
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: 700;
						background: var(--cl-accent);
						border-radius: 12px;
						outline: none;
						border: none;
						color: white;
						padding: 0.6rem 1.2rem;
						cursor: pointer;

						transition: all 0.2s ease;
					}
				`}
			</style>
		</>
	);
}

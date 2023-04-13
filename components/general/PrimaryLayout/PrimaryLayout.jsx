import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { AuthModalContext } from "@/context/AuthModalContext";
import AuthModal from "../Auth/AuthModal";
import { Toaster } from "react-hot-toast";

export default function PrimaryLayout({ children, user }) {
	const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);
	const [headerHeight, setHeaderHeight] = useState("");

	// useEffect(() => {
	// 	const height = document.getElementsByClassName("header-wrapper")[0].clientHeight;
	// 	setHeaderHeight(height);
	// }, []);

	return (
		<>
			<div>
				<Header user={user} />
				<Toaster position="bottom-center" />

				{children}
				<Footer />
				{showAuthModal && <AuthModal />}
				<style jsx>{`
					div {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
						justify-content: space-between;
						gap: 2rem;
					}

					// @media (max-width: 768px) {
					// 	:global(.container) {
					// 		padding-top: ${headerHeight}px;
					// 	}
					// }
				`}</style>
			</div>
		</>
	);
}

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
					font-size: 1rem;
					color: var(--cl-text);
					text-align: center;
					margin-top: -4.5rem;
					// margin-bottom: 2rem;
					font-weight: 400;
				}

				@media (max-width: 768px) {
					h3 {
						font-size: 0.8rem;
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
					text-align: justify;
					margin: 0 auto;
					margin-bottom: 1rem;
					font-size: 0.975rem;
				}

				@media (max-width: 780px) {
					p {
						width: 100%;
					}
				}
			`}</style>
		</>
	);
}

export function ParagraphTitle({ children, style, tag, id }) {
	const Tag = tag || "h4";
	return (
		<>
			<Tag style={style} id={id}>
				{children}
			</Tag>
			<style jsx>
				{`
					${Tag} {
						color: var(--cl-text);
						margin-top: 2rem;
						margin-bottom: 0.5rem;
						scroll-margin-top: 5px;
					}

					h4 {
						font-weight: 700;
						font-size: 1.3rem;
					}

					h5 {
						font-weight: 600;
						font-size: 1.2rem;
					}

					h5 {
						font-weight: 500;
						font-size: 1.1rem;
					}
				`}
			</style>
		</>
	);
}

export function ParagraphLink({ children, style, href, target }) {
	return (
		<>
			<a href={href} target={target}>
				{children}
			</a>
			<style jsx>
				{`
					a {
						font-size: inherit;
						font-weight: 500;
						text-decoration: none;
						color: var(--cl-accent);
						transition: all 1s ease;
						position: relative;
						cursor: pointer;
					}

					a::after {
						content: "";
						position: absolute;
						bottom: -2px;
						left: 0;
						width: 0;
						height: 1px;
						background-color: var(--cl-accent);
						box-shadow: 0 0 1px var(--cl-accent);
						transition: width 0.3s ease;
					}
					a:hover::after {
						width: 100%;
					}
				`}
			</style>
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

export function UList({ children, style }) {
	return (
		<>
			<ul style={style}>{children}</ul>
			<style jsx>
				{`
					ul li {
						color: var(--cl-text);
					}
					ul :global(li::marker) {
						color: var(--cl-accent);
					}
				`}
			</style>
		</>
	);
}
export function TextContainer({ children }) {
	return (
		<>
			<div>{children}</div>
			<style jsx>{`
				div {
					margin: 0 auto;
					width: 70%;
				}
				@media (max-width: 780px) {
					div {
						width: 100%;
					}
				}
			`}</style>
		</>
	);
}

import React, { useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { AuthModalContext } from "@/context/AuthModalContext";
import AuthModal from "../Auth/AuthModal";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
export default function PrimaryLayout({ children, user }) {
	const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);
	// toast.remove();
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

export function ParagraphTitle({ children, style, tag }) {
	const Tag = tag || "h4";
	return (
		<>
			<Tag style={style}>{children}</Tag>
			<style jsx>
				{`
					${Tag} {
						color: var(--cl-text);
						margin-top: 2rem;
						margin-bottom: 0.5rem;
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

export function ParagraphLink({ children, style, href }) {
	return (
		<>
			<a href={href} target="_blank" className="link">
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
						width: 100%;
						height: 1px;
						background: var(--cl-accent);
						bottom: -1px;
						left: 0px;
						transition: all 0.3s ease;
						transform: scaleX(0);
						transform-origin: 0 0;
						/* opacity: 0; */
					}

					a:hover::after {
						transform: scaleX(1);
						transform-origin: 0 0;
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

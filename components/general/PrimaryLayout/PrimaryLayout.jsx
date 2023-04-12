import React, { useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { AuthModalContext } from "@/context/AuthModalContext";
import AuthModal from "../Auth/AuthModal";
import { Toaster, toast } from "react-hot-toast";
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

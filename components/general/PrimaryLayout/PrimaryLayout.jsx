import React, { useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AuthModalProvider, { AuthModalContext } from "@/context/AuthModalContext";
import AuthModal from "../Auth/AuthModal";

export default function PrimaryLayout({ children, user }) {
	const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);

	return (
		<>
			<div>
				<Header user={user} />
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

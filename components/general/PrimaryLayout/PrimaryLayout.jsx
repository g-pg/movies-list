import React, { useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AuthModalProvider, { AuthModalContext } from "@/context/AuthModalContext";
import AuthModal from "../Auth/AuthModal";
import { Toaster, toast } from "react-hot-toast";
export default function PrimaryLayout({ children, user }) {
	const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);
	toast.remove();
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

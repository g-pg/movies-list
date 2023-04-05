import React, { createContext, useState, useEffect } from "react";

export const AuthModalContext = createContext();

export default function AuthModalProvider({ children }) {
	const [showAuthModal, setShowAuthModal] = useState(false);

	useEffect(() => {
		showAuthModal
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "auto");
	}, [showAuthModal]);

	return (
		<AuthModalContext.Provider value={{ showAuthModal, setShowAuthModal }}>
			{children}
		</AuthModalContext.Provider>
	);
}

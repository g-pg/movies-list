import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function PrimaryLayout({ children, user }) {
	return (
		<>
			<div>
				<Header user={user} />
				{children}
				<Footer />

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

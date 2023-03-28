import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
export default function PrimaryLayout({ children }) {
	return (
		<>
			<div className="big-container">
				<Header />
				<div className="container">{children}</div>
				<Footer />

				<style jsx>{`
					.big-container {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
						justify-content: space-between;
					}
				`}</style>
			</div>
		</>
	);
}

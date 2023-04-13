import React, { useEffect, useState } from "react";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import { TbSunFilled, TbMoonStars } from "react-icons/tb";
export default function ThemeSwitcher() {
	const [theme, setTheme] = useState(
		typeof window !== "undefined" ? localStorage.getItem("theme") || "darkTheme" : "darkTheme"
	);

	function toggleTheme() {
		setTheme((prev) => (prev === "darkTheme" ? "lightTheme" : "darkTheme"));
	}

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.body.className = theme;
	}, [theme]);
	return (
		<>
			<div>
				<SecondaryBtn
					as="btn"
					onClick={toggleTheme}
					size="1.2rem"
					icon={theme === "darkTheme" ? <TbMoonStars /> : <TbSunFilled />}
				/>
			</div>
			<style jsx>
				{`
					div :global(button) {
						margin: 0 auto;
					}
				`}
			</style>
		</>
	);
}

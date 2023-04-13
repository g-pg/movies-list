import React, { useEffect, useLayoutEffect, useState } from "react";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import { TbSunFilled, TbMoonStars } from "react-icons/tb";

export default function ThemeSwitcher() {
	const [theme, setTheme] = useState("");

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "darkTheme";
		setTheme(storedTheme);
	}, []);

	function toggleTheme() {
		const newTheme = theme === "darkTheme" ? "lightTheme" : "darkTheme";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	}

	useEffect(() => {
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

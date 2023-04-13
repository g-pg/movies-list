import React, { useState } from "react";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import { TbSunFilled, TbMoonStars } from "react-icons/tb";
export default function ThemeSwitcher() {
	const [darkTheme, setDarkTheme] = useState(true);

	function toggleTheme() {
		setDarkTheme(!darkTheme);
		document.body.classList.toggle("darkTheme");
	}

	return (
		<>
			{/* <button onClick={toggleTheme} title="Alternar tema"></button> */}
			<div>
				<SecondaryBtn
					as="btn"
					onClick={toggleTheme}
					size="1.2rem"
					icon={darkTheme ? <TbSunFilled /> : <TbMoonStars />}
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

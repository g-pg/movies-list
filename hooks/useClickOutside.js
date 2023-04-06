import React, { useEffect, useRef, useState } from "react";

export default function useClickOutside(setShow) {
	const ref = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				setShow(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside, true);

		return () => document.removeEventListener("mousedown", handleClickOutside, true);
	}, [ref, setShow]);

	return { ref };
}

import React, { useEffect, useRef, useState } from "react";

export default function useClickOutside(setShow) {
	const ref = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				setShow(false);
			}
		}
		document.addEventListener("click", handleClickOutside, true);

		return () => document.removeEventListener("click", handleClickOutside, true);
	}, [ref, setShow]);

	return { ref };
}

// import { useEffect, useRef } from "react";

// export default function useHideElement(setShow) {
// 	const ref = useRef(null);

// 	function handleClickOutside(event) {
// 		if (ref.current && !ref.current.contains(event.target)) {
// 			setShow(false);
// 		}
// 	}

// 	useEffect(() => {
// 		document.addEventListener("click", handleClickOutside, true);

// 		return () => {
// 			document.removeEventListener("click", handleClickOutside, true);
// 		};
// 	}, [ref]);

// 	return (newRef) => {
// 		ref.current = newRef;
// 	};
// }

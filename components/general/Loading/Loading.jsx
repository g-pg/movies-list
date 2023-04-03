import React from "react";
import LoadingSvg from "@/public/loading.svg";
export default function Loading() {
	return (
		<LoadingSvg
			style={{
				margin: "auto",
				inset: "0",
				position: "absolute",
			}}
		/>
	);
}

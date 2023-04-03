import React from "react";
import Image from "next/image";
import LoadingSvg from "@/public/loading.svg";
export default function Loading() {
	return (
		<p>
			<Image
				src={LoadingSvg}
				alt="Loading..."
				style={{
					margin: "auto",
					inset: "0",
					position: "absolute",
				}}
			></Image>
		</p>
	);
}

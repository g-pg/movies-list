import React from "react";
import LoadingSvg from "@/public/loading.svg";
export default function Loading({ style }) {
	style = style || { margin: "auto", inset: "0", position: "absolute" };
	return <LoadingSvg style={style} />;
}

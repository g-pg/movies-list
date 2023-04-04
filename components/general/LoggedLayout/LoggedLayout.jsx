import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";

export default function LoggedLayout({ children, user }) {
	return <div>{children}</div>;
}

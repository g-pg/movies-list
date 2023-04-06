import React, { useState } from "react";
import Image from "next/image";

import styles from "./NavAvatar.module.css";
import NavSettings from "../NavSettings/NavSettings";
import useClickOutside from "@/hooks/useClickOutside";
import { useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
export default function NavAvatar({ user }) {
	// const { data: session } = useSession();

	const [showSettings, setShowSettings] = useState(false);
	const { ref: settingsRef } = useClickOutside(setShowSettings);

	return (
		<div className={styles.wrapper} ref={settingsRef}>
			<button
				className={styles.avatar}
				onClick={() => setShowSettings((prev) => !prev)}
				aria-label="Perfil"
			>
				{user && user.image ? (
					<Image src={user.image} alt={user.name} fill />
				) : (
					<p>{user.name[0]}</p>
				)}
			</button>
			{showSettings && (
				<div className={styles.settings}>
					<div>
						<p className={styles.name}>{user.name}</p>
						<p>{user.email}</p>
					</div>
					<NavSettings />
				</div>
			)}
		</div>
	);
}

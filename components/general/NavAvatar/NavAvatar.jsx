import React, { useState } from "react";
import Image from "next/image";

import styles from "./NavAvatar.module.css";
import NavSettings from "../NavSettings/NavSettings";
import useClickOutside from "@/hooks/useClickOutside";
export default function NavAvatar({ user }) {
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
					<p style={{ color: "white" }}>{user.name[0].toUpperCase()}</p>
				)}
			</button>
			{showSettings && (
				<div className={styles.settingsWrapper}>
					<div className={styles.settings}>
						<div>
							<p className={styles.name}>{user.name}</p>
							<p>{user.email}</p>
						</div>
						<NavSettings />
					</div>
					<div className={styles.overlay}></div>
				</div>
			)}
		</div>
	);
}

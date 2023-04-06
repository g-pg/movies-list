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
			<div className={styles.avatar} onClick={() => setShowSettings((prev) => !prev)}>
				{user.image ? (
					<Image src={user.image} alt={user.name} fill />
				) : (
					<p>{user.name[0]}</p>
				)}
			</div>
			{showSettings && (
				<div className={styles.settings}>
					<div>
						<p>{user.name}</p>
						<p>{user.email}</p>
					</div>
					<NavSettings />
				</div>
			)}
		</div>
	);
}

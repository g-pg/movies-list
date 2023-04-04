import PrimaryBtn from "@/components/general/PrimaryBtn/PrimaryBtn";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import AuthModal from "../Auth/AuthModal";
import styles from "./Nav.module.css";
import useShowModal from "@/hooks/useShowModal";

export default function Nav() {
	const [showModal, setShowModal] = useShowModal();

	return (
		<>
			<nav className={styles.nav}>
				<ul>
					<li>
						<a href="#">Sobre</a>
					</li>

					<li>
						<PrimaryBtn
							style={{ padding: "0.3rem 0.8rem" }}
							onClick={() => setShowModal((prev) => !prev)}
						>
							Login
						</PrimaryBtn>
					</li>
				</ul>
			</nav>

			{showModal && <AuthModal setShowModal={setShowModal} />}
		</>
	);
}

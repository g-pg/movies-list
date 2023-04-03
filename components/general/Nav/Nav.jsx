import PrimaryBtn from "@/components/general/PrimaryBtn/PrimaryBtn";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import AuthModal from "../Auth/AuthModal";
import styles from "./Nav.module.css";

export default function Nav() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<nav className={styles.nav}>
				<ul>
					<li>
						<PrimaryBtn
							style={{ padding: "0.3rem 0.8rem" }}
							onClick={() => setShowModal((prev) => !prev)}
						>
							Login
						</PrimaryBtn>
					</li>
					<li>
						<a href="#">Sobre</a>
					</li>
				</ul>
			</nav>

			{showModal && <AuthModal setShowModal={setShowModal} />}
		</>
	);
}

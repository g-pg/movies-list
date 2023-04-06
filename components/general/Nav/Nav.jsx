import { useSession } from "next-auth/react";
import { useContext } from "react";
import { AuthModalContext } from "@/context/AuthModalContext";
import Link from "next/link";

import styles from "./Nav.module.css";
import PrimaryBtn from "@/components/general/PrimaryBtn/PrimaryBtn";
import NavAvatar from "../NavAvatar/NavAvatar";

export default function Nav() {
	const { showAuthModal, setShowAuthModal } = useContext(AuthModalContext);
	const { data: session } = useSession();
	const user = session ? session?.user : null;

	return (
		<>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link href="/sobre">Sobre</Link>
					</li>
					{user && (
						<li>
							<Link href="/minhas-listas">Minhas listas</Link>
						</li>
					)}
					<li>
						{user ? (
							<NavAvatar user={user} />
						) : (
							<PrimaryBtn
								style={{ padding: "0.3rem 0.8rem" }}
								onClick={() => setShowAuthModal((prev) => !prev)}
							>
								Login
							</PrimaryBtn>
						)}
					</li>
				</ul>
			</nav>
		</>
	);
}

import PrimaryBtn from "@/components/general/PrimaryBtn/PrimaryBtn";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import AuthModal from "../Auth/AuthModal";
import styles from "./Nav.module.css";
import useShowModal from "@/hooks/useShowModal";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function Nav() {
	const [showModal, setShowModal] = useShowModal();
	const { data: session } = useSession();
	const { data: user } = useCurrentUser();
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
							<Link href="/user">
								<div className={styles.avatar}>
									{user.image ? (
										<Image src={user.image} alt={user.name} fill />
									) : (
										<p>{user.name[0]}</p>
									)}
								</div>
							</Link>
						) : (
							<PrimaryBtn
								style={{ padding: "0.3rem 0.8rem" }}
								onClick={() => setShowModal((prev) => !prev)}
							>
								Login
							</PrimaryBtn>
						)}
					</li>
				</ul>
			</nav>

			{showModal && <AuthModal setShowModal={setShowModal} />}
		</>
	);
}

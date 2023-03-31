import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

import PrimaryBtn from "@components/PrimaryBtn/PrimaryBtn";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { IoMdClose } from "react-icons/io";
import styles from "./AuthModal.module.css";

export default function AuthModal({ setShowModal }) {
	const router = useRouter();
	const [formType, setFormType] = useState("login");

	const [formData, setFormData] = useState({
		userName: "",
		password: "",
	});

	function handleChange(e) {
		setFormData((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (formType === "register") {
			console.log("registrando");
			register();
		} else if (formType === "login") {
			console.log("logando");
			login();
		}
	}

	const login = useCallback(async () => {
		// const { userName, password } = formData;
		try {
			await signIn("credentials", {
				userName: formData.userName,
				password: formData.password,
				redirect: false,
			});

			router.push("/user");
			console.log("loguei!");
		} catch (error) {
			console.log(error);
		}
	}, [formData]);

	const register = useCallback(async () => {
		try {
			await axios.post("/api/register", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			login();
		} catch (error) {
			console.log(error);
		}
	}, [formData, login]);

	return (
		<>
			<div className={styles.modalWrapper}>
				<div className={styles.header}>
					<button
						style={{ color: formType === "login" && "var(--cl-accent)" }}
						onClick={() => setFormType("login")}
					>
						Login
					</button>
					<button
						style={{ color: formType === "register" && "var(--cl-accent)" }}
						onClick={() => setFormType("register")}
					>
						Cadastro
					</button>
				</div>
				<form action="">
					<input
						type="text"
						placeholder="Usuário"
						id="userName"
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="Senha"
						id="password"
						onChange={handleChange}
					/>
					<PrimaryBtn type="submit" onClick={handleSubmit} style={{ width: "30%" }}>
						{formType === "login" ? "Login" : "Cadastro"}
					</PrimaryBtn>
				</form>
				<p>
					* Esta é uma aplicação de estudos. Todos os dados serão deletados em 7 dias
					a partir do registro.
				</p>
				<button onClick={() => setShowModal(false)} className={styles.closeBtn}>
					<IoMdClose style={{ fontSize: "1.8rem" }} />
				</button>
			</div>
			<div className={styles.overlay} onClick={() => setShowModal(false)}></div>
		</>
	);
}

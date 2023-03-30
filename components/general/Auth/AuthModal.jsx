import PrimaryBtn from "@components/PrimaryBtn/PrimaryBtn";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./AuthModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AuthModal({ setShowModal }) {
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
		}
	}

	const register = useCallback(async () => {
		const { userName, password } = formData;

		try {
			await axios.post(
				"/api/register",
				{ userName, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	}, [formData]);

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
					<FontAwesomeIcon icon={faXmark} style={{ fontSize: "5rem" }} />
				</button>
			</div>
			<div className={styles.overlay} onClick={() => setShowModal(false)}></div>
		</>
	);
}

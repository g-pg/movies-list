import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function TestPage() {
	const [user, setUser] = useState("");
	const [userFound, setUserFound] = useState("");
	async function findUser(user) {
		try {
			const url = `../api/test?email=${user}`;
			const res = await fetch(url);
			const data = await res.json();
			if (res.ok) {
				setUserFound(data.email);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			setUserFound(error.message);
			console.log(error);
		}
	}

	async function deleteAllUsers() {
		const confirmed = window.confirm(
			"Você tem certeza? Esta ação deleterá todos os usuários da database."
		);

		if (!confirmed) return;
		try {
			const url = "../api/test?deleteUser=delete-all-users";
			const res = await fetch(url, {
				method: "DELETE",
			});
			if (res.status == 200) {
				const data = await res.json();
				console.log(data.message);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<div className="wrapper">
				<button onClick={() => deleteAllUsers()}>Delete all users</button>
				<div className="find-user">
					<button onClick={() => findUser(user)}>Find User</button>
					<input
						type="text"
						value={user}
						onChange={(e) => setUser(e.target.value)}
					/>
					<p>
						User found: <span style={{ color: "red" }}>{userFound}</span>
					</p>
				</div>
			</div>

			<style jsx>{`
				.wrapper {
					display: flex;
					flex-direction: column;
					gap: 2rem;
				}

				.wrapper button {
					max-width: 300px;
				}

				.find-user {
					display: flex;
					align-items: center;
					gap: 1rem;
				}
			`}</style>
		</>
	);
}

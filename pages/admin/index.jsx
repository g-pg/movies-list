import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import fetcher from "@/lib/fetcher";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/?auth=true",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function TestPage() {
	const [user, setUser] = useState("");
	const [userFound, setUserFound] = useState("");
	const router = useRouter();
	const { data: userLogged, status } = useCurrentUser();

	async function findUser(user) {
		try {
			const url = `../api/test?email=${user}`;

			const data = await fetcher(url);
			setUserFound(data.email);
		} catch (error) {
			setUserFound(error.response.data.error);
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
			} else {
				throw new Error(data.error);
			}
		} catch (error) {}
	}

	function handleSignOut() {
		signOut({ callbackUrl: "/" });
	}

	useEffect(() => {
		if (userLogged && userLogged.role !== "admin") {
			router.replace("/?auth=true");
		}
	}, [userLogged, router]);

	if (userLogged?.role != "admin") {
		return (
			<p
				style={{
					position: "absolute",
					inset: "0",
					margin: "auto",
					color: "red",
					fontSize: "3rem",
					fontWeight: "700",
				}}
			>
				Você não deveria estar aqui.
			</p>
		);
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
				<button onClick={handleSignOut}>Sign Out</button>
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

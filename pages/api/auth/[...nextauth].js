import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismadb from "@/lib/prismadb";

export const authOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prismadb),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		Credentials({
			id: "credentials",
			name: "credentials",
			credentials: {
				userName: {
					label: "Usuário",
					type: "text",
				},
				password: {
					label: "Senha",
					type: "password",
				},
			},
			async authorize(credentials) {
				if (!credentials.userName || !credentials.password) {
					throw new Error("É preciso preencher o usuário e a senha.");
				}

				const user = await prismadb.user.findUnique({
					where: {
						userName: credentials.userName,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("O usuário não existe.");
				}

				const isCorrectPassword = await compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isCorrectPassword) {
					throw new Error("Senha inválida.");
				}

				return user;
			},
		}),
	],

	// pages: {
	// 	signIn: "/auth",
	// },

	debug: process.env.NODE_ENV === "development",

	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

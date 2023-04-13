import "../styles/reset.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AuthModalProvider from "@/context/AuthModalContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/general/Loading/Loading";
import Head from "next/head";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter();
	const [loadingPage, setLoadingPage] = useState(false);
	useEffect(() => {
		const handleComplete = () => setLoadingPage(false);

		const handleStart = () => setLoadingPage(true);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				{/* META TAGS */}
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<meta
					name="description"
					content="Por que perder aquela recomendação se você pode anotar tudo aqui? Registre os filmes que você quer ver e nunca mais perca tempo procurando o que assistir!"
					key="desc"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:title" content="Muvi" />
				<meta
					property="og:description"
					content="Por que perder aquela recomendação se você pode anotar tudo aqui? Registre os filmes que você quer ver e nunca mais perca tempo procurando o que assistir!"
				/>
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/g-pg/muvi/main/readme/desktop-preview.png"
				/>
			</Head>
			<SessionProvider session={session}>
				<AuthModalProvider>
					{loadingPage ? <Loading /> : <Component {...pageProps} />}
				</AuthModalProvider>
			</SessionProvider>
		</>
	);
}

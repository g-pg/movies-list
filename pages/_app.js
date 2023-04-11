import "../styles/reset.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AuthModalProvider from "@/context/AuthModalContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/general/Loading/Loading";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter();
	const [loadingPage, setLoadingPage] = useState(false);
	useEffect(() => {
		const handleComplete = () => setLoadingPage(false);

		function handleStart() {
			setLoadingPage(true);
		}

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
			<SessionProvider session={session}>
				<AuthModalProvider>
					{loadingPage ? <Loading /> : <Component {...pageProps} />}
				</AuthModalProvider>
			</SessionProvider>
		</>
	);
}

import "../styles/reset.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AuthModalProvider from "@/context/AuthModalContext";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<SessionProvider session={session}>
				<AuthModalProvider>
					<Component {...pageProps} />
				</AuthModalProvider>
			</SessionProvider>
		</>
	);
}

import PrimaryLayout from "@components/general/PrimaryLayout/PrimaryLayout";
import Slider from "@components/pages/Home/Slider/Slider";
import HeroSection from "@components/pages/Home/HeroSection/HeroSection";
import Head from "next/head";

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "@/components/general/Loading/Loading";
import { AuthModalContext } from "@/context/AuthModalContext";

export async function getStaticProps() {
	const KEY = process.env.MOVIEDB_KEY;
	const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;

	const res = await fetch(URL);
	const popularMovies = await res.json();

	return {
		props: {
			popularMovies,
		},
	};
}

export default function Home({ popularMovies }) {
	const { setShowAuthModal } = useContext(AuthModalContext);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (router.query.auth == "true") {
			setShowAuthModal(true);
		}
	}, [router.query.auth, setShowAuthModal]);

	if (status === "loading") {
		return <Loading />;
	} else if (status === "authenticated") {
		router.push("/user");
		return <Loading />;
	}

	return (
		<>
			<main>
				<PrimaryLayout>
					<HeroSection setShowAuthModal={setShowAuthModal} />

					<Slider popularMovies={popularMovies} />
				</PrimaryLayout>
			</main>

			<style jsx>{``}</style>
		</>
	);
}

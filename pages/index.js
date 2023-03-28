import Header from "@components/general/Header/Header";
import PrimaryLayout from "@components/general/PrimaryLayout/PrimaryLayout";
import Carroussel from "@components/pages/Home/Carroussel/Carroussel";
import HeroSection from "@components/pages/Home/HeroSection/HeroSection";
import Head from "next/head";

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
	return (
		<>
			<Head>
				<title>Muvi</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<PrimaryLayout>
					<HeroSection />
					<Carroussel popularMovies={popularMovies} />
				</PrimaryLayout>
			</main>
		</>
	);
}

import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

export default function useMoviesInfo(list) {
	const userSavedMovies = list;
	const ids = userSavedMovies?.join(",");
	let key = `/api/searchmovie?id=${ids}`;

	if (list === undefined) {
		key = false;
	}

	const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
		revalidateOnFocus: false,
	});

	return { data, isLoading, error, mutate };
}

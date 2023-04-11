import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

export default function useMoviesInfo(list) {
	const userSavedMovies = list;
	const ids = userSavedMovies?.join(",");
	const key = `/api/searchmovie?id=${ids}`;

	const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
		revalidateOnFocus: false,
	});

	return { data, isLoading, error, mutate };
}

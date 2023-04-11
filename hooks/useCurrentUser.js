import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
	const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher, {
		revalidateOnFocus: false,
	});

	console.log("usecurrentuser");
	return {
		data,
		error,
		isLoading,
		mutate,
	};
};

export default useCurrentUser;

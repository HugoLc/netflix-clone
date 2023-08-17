import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (movieId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/movie/${movieId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
};

export default useMovie;

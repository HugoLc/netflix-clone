import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavoritesList from "@/hooks/useFavoritesList";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favMovies = [] } = useFavoritesList();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal onClose={() => closeModal()} visible={isOpen}></InfoModal>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
      </div>
      <div className="pb-40">
        <MovieList title="Favorites" data={favMovies} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

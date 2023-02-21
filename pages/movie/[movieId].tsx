import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactModal from "react-modal";
import MovieDetail from "../../components/MovieDetail";
import { getMovieDetail } from "../../services/tmdbApi";
import { Movie } from "../../types/moive";

ReactModal.setAppElement("#__next");

interface iProps {
  movie: Movie;
}
const MovieDetailPage = ({ movie }: iProps) => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/main");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ReactModal
        isOpen={true} // The modal should always be shown on page load, it is the 'page'
        onRequestClose={() =>
          router.push("/main", undefined, { scroll: false })
        }
        contentLabel="Post modal"
      >
        <MovieDetail movie={movie} />
      </ReactModal>
    </>
  );
};

export default MovieDetailPage;

export async function getStaticProps({ params: { movieId } }) {
  try {
    const { data: movie } = await getMovieDetail(movieId);
    return { props: { movieId: movieId, movie: movie } };
  } catch {
    return {
      notFound: true,
    };
  }
}

export function getStaticPaths() {
  return {
    paths: [{ params: { movieId: "176762" } }],
    fallback: true,
  };
}

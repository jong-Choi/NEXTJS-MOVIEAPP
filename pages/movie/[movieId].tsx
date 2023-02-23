import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import MovieDetail from "../../components/MovieDetail";
import { getMovieDetail } from "../../services/tmdbApi";
import { Movie } from "../../types/moive";
import MainPage from "../main";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onClose = () => {
    router.push("/main", undefined, { scroll: false });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/main.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <StyledModal
          isOpen={true} // The modal should always be shown on page load, it is the 'page'
          onRequestClose={onClose}
          contentLabel="Post modal"
          style={{
            overlay: {
              background: "rgba(255, 0, 0, 0)",
              position: "absolute",
              top: 0,
              left: 0,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              width: "100%",
              height: "500%",
            },
          }}
        >
          <MovieDetail onClose={onClose} movie={movie} />
        </StyledModal>
      </div>
    </>
  );
};

export default MovieDetailPage;

const StyledModal = styled(ReactModal)`
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
  padding: 0px;
  position: sticky;
  @media (min-width: 769px) {
    max-height: 50vw;
    margin: 0 5vw;
    overflow: hidden;
    top: 50%;
    transform: translate(0%, -50%);
  }
  @media (min-width: 1400px) {
    aspect-ratio: 16/9;
    margin: 0 20vw;
    overflow: hidden;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;

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

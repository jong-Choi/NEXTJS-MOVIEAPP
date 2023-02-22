import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
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

  const StyledModal = styled(ReactModal)`
    /* background-color: black; */
    border: 1px solid black;
    border-radius: 5px;
    outline: none;
    padding: 0px;
    position: sticky;
    width: 50vw;
    height: 30vw;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

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
          onRequestClose={() =>
            router.push("/main", undefined, { scroll: false })
          }
          contentLabel="Post modal"
          style={{
            overlay: {
              background: "rgba(255, 0, 0, 0)",
              position: "absolute",
              top: 0,
              left: 0,
              backdropFilter: "blur(30px)",
              width: "100%",
              height: "500%",
            },
            // content: {
            //   position: "absolute",
            //   top: "40px",
            //   left: "40px",
            //   right: "40px",
            //   bottom: "40px",
            //   border: "0px",
            //   background: "#fff",
            //   overflow: "auto",
            //   WebkitOverflowScrolling: "touch",
            //   borderRadius: "4px",
            //   outline: "none",
            //   padding: "0px",
            // },
          }}
        >
          <MovieDetail
          // movie={movie}
          />
        </StyledModal>
      </div>
    </>
  );
};

export default MovieDetailPage;

// export async function getStaticProps({ params: { movieId } }) {
//   try {
//     const { data: movie } = await getMovieDetail(movieId);
//     return { props: { movieId: movieId, movie: movie } };
//   } catch {
//     return {
//       notFound: true,
//     };
//   }
// }

// export function getStaticPaths() {
//   return {
//     paths: [{ params: { movieId: "176762" } }],
//     fallback: true,
//   };
// }

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
    if (!movie?.backdrop_path) router.push("/main");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onClose = () => {
    router.back();
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

import fetch from "node-fetch";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import axios from "axios";
export async function getStaticProps({ params: { movieId } }) {
  try {
    const { data: movie } = await getMovieDetail(movieId);

    const response = await axios.get(
      `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`,
      {
        responseType: "arraybuffer",
      },
    );
    const buffer = Buffer.from(response.data);
    const optimizedImage = await sharp(Buffer.from(buffer))
      .jpeg({ quality: 60, mozjpeg: true })
      .toBuffer();
    const filePath = path.resolve(
      path.join(process.cwd(), "public", "backdrop", movie.backdrop_path),
    );
    fs.writeFileSync(filePath, optimizedImage);

    const responsePoster = await axios.get(
      `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      {
        responseType: "arraybuffer",
      },
    );
    const bufferPoster = Buffer.from(responsePoster.data);
    const optimizedImagePoster = await sharp(Buffer.from(bufferPoster))
      .jpeg({ quality: 60, mozjpeg: true })
      .toBuffer();
    const filePathPoster = path.resolve(
      path.join(process.cwd(), "public", "poster", movie.poster_path),
    );
    fs.writeFileSync(filePathPoster, optimizedImagePoster);

    return { props: { movieId: movieId, movie: movie } };
  } catch (e) {
    console.log(e);
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

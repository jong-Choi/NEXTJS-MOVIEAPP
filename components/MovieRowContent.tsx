import React, { useRef, useState } from "react";
import { useIntersection } from "../utils/useIntersection";
import Link from "next/link";
import { MovieEssential } from "../types/moive";

interface iProps {
  movie: MovieEssential;
  cardMode: boolean;
}

const MovieRowContent = ({ movie, cardMode = false }: iProps) => {
  const { id } = movie;
  const [Loading, setIsLoading] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  return (
    <Link
      key={id}
      href="/movie/[movieId]"
      as={`/movie/${id}`}
      scroll={false}
      shallow={true}
      onMouseEnter={() => {
        const imageBackdrop = new Image();
        const imagePoster = new Image();
        imageBackdrop.src = `/backdrop/${movie?.backdrop_path}`;
        imagePoster.src = `/poster/${movie?.poster_path}`;
        return (
          <>
            {imageBackdrop}
            {imagePoster}
          </>
        );
      }}
    >
      <figure ref={imgRef}>
        <div
          style={{
            width: "100%",
            paddingTop: "56.25%",
            backgroundImage: `url('/noResult.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <img
            alt={movie.title}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "0",
              height: "100%",
              objectFit: "cover",
            }}
            className={`row__poster ${isInView ? "" : "invisble"}`}
            onLoad={() => setIsLoading(0)}
            src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
          />
          <div
            className="overlay"
            // style={
            //   Loading
            //     ? {
            //         display: "block",
            //         opacity: "1",
            //         backdropFilter: "blur(10px)",
            //       }
            //     : {
            //         backdropFilter: "blur(0px)",
            //       }
            // }
          >
            <div
              className="description"
              style={{
                cursor: "pointer",
              }}
            >
              {movie.title}
            </div>
          </div>
        </div>
      </figure>
    </Link>
  );
};

export default MovieRowContent;

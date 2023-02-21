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
    >
      <figure ref={imgRef}>
        <div
          style={{
            width: "100%",
            paddingTop: "56.25%",
            backgroundImage: Loading
              ? `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wEEEAGQAZABkAGQAakBkAHCAfQB9AHCAnECowJYAqMCcQOdA1IDBwMHA1IDnQV4A+gEMwPoBDMD6AV4CE0FLQYOBS0FLQYOBS0ITQdTCOMHOga9BzoI4wdTDS8KWgkuCS4KWg0vDzwMywwcDMsPPBJ1EIEQgRJ1Fz4WEhc+Hl8eXyjSEQGQAZABkAGQAakBkAHCAfQB9AHCAnECowJYAqMCcQOdA1IDBwMHA1IDnQV4A+gEMwPoBDMD6AV4CE0FLQYOBS0FLQYOBS0ITQdTCOMHOga9BzoI4wdTDS8KWgkuCS4KWg0vDzwMywwcDMsPPBJ1EIEQgRJ1Fz4WEhc+Hl8eXyjS/8IAEQgACQAQAwEiAAIRAQMRAf/EACgAAQEBAAAAAAAAAAAAAAAAAAEAAgEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAykf/xAAUEAEAAAAAAAAAAAAAAAAAAAAg/9oACAEBAAE/AB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==')`
              : "",
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
            className="row__poster "
            onLoad={() => setIsLoading(0)}
            src={
              isInView
                ? `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`
                : ""
            }
          />
          <div
            className="overlay"
            style={
              Loading
                ? {
                    display: "block",
                    opacity: "1",
                    backdropFilter: "blur(10px)",
                  }
                : {
                    backdropFilter: "blur(0px)",
                  }
            }
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

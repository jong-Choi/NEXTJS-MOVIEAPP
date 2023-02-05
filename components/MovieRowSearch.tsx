import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";

const MovieRowSearch = ({ movie }) => {
  const [Loading, setIsLoading] = useState(1);
  return (
    // <SwiperSlide key={movie.id}>
    <figure
    // style={{
    //   backgroundImage:
    //     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wEEEAGQAZABkAGQAakBkAHCAfQB9AHCAnECowJYAqMCcQOdA1IDBwMHA1IDnQV4A+gEMwPoBDMD6AV4CE0FLQYOBS0FLQYOBS0ITQdTCOMHOga9BzoI4wdTDS8KWgkuCS4KWg0vDzwMywwcDMsPPBJ1EIEQgRJ1Fz4WEhc+Hl8eXyjSEQGQAZABkAGQAakBkAHCAfQB9AHCAnECowJYAqMCcQOdA1IDBwMHA1IDnQV4A+gEMwPoBDMD6AV4CE0FLQYOBS0FLQYOBS0ITQdTCOMHOga9BzoI4wdTDS8KWgkuCS4KWg0vDzwMywwcDMsPPBJ1EIEQgRJ1Fz4WEhc+Hl8eXyjS/8IAEQgACQAQAwEiAAIRAQMRAf/EACgAAQEBAAAAAAAAAAAAAAAAAAEAAgEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAykf/xAAUEAEAAAAAAAAAAAAAAAAAAAAg/9oACAEBAAE/AB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==",
    // }}
    >
      <img
        src="/noResult.jpg"
        className="position-absolute"
        style={{
          position: "absolute",
          opacity: `${Loading}`,
          width: "100%",
          height: "56.25%",
        }}
      ></img>

      <img
        alt={movie.title || movie.original_title}
        style={{
          width: "100%",
          height: "56.25%",
        }}
        // key={movie.id}
        className="row__poster"
        onLoad={() => setIsLoading(0)}
        src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
        onClick={() => console.log("안녕하세요")}
      />

      <div
        className="overlay"
        style={{
          height: "100%",
          backdropFilter: `${Loading ? "blur(10px)" : "blur(0px)"}`,
        }}
      >
        <div
          className="description"
          style={{
            fontSize: "x-small",
            cursor: "pointer",
          }}
        >
          {movie.title || movie.original_title}
        </div>
      </div>
    </figure>
    // </SwiperSlide>
  );
};

export default MovieRowSearch;

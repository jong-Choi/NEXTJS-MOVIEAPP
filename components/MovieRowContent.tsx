import React from "react";
import { SwiperSlide } from "swiper/react";

const MovieRowContent = ({ movie }) => {
  return (
    // <SwiperSlide key={movie.id}>
    <figure>
      <img
        alt={movie.title || movie.original_title}
        style={{
          cursor: "pointer",
        }}
        // key={movie.id}
        className="row__poster"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        onClick={() => console.log("안녕하세요")}
      />
      <div className="overlay">
        <div
          className="description"
          style={{
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

export default MovieRowContent;

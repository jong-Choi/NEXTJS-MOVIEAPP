import tmdbApi from "../services/tmdbApi";
import React, { useEffect, useState } from "react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { StyledMovieRow } from "../styles/StyledMovieRow";
import MovieRowSearch from "./MovieRowSearch";
import MovieRowContent from "./MovieRowContent";

interface iProps {
  title: string;
  id: string;
  fetchUrl?: string;
  movieList?: Array<any>;
  onResultClick?: Function;
}
function MovieRow({ title, id, fetchUrl, movieList, onResultClick }: iProps) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  });

  // useEffect(() => {
  //   if (movieList && movieList.length) setMovies(movieList);
  // }, [movieList]);
  // const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const fetchMovieData = async () => {
    let request;
    if (fetchUrl) request = await tmdbApi.get(fetchUrl);
    const newMovies = movieList || request.data.results;
    setMovies(newMovies);
  };

  const handleClick = (movie) => {
    if (onResultClick) {
      onResultClick(movie);
      return;
    }
    // setModalOpen(true);
    setMovieSelected(movie);
  };

  // movie 객체 내용
  // backdrop_path: "/5vUux2vNUTqwCzb7tVcH18XnsF.jpg"
  // first_air_date: "2022-09-21"
  // genre_ids: (2) [18, 80]
  // id: 113988
  // name: "다머"
  // origin_country: ['US']
  // original_language: "en"
  // original_name: "Dahmer – Monster: The Jeffrey Dahmer Story"
  // overview: "범행 기간 10년 이상. 피해자만 무려 17명. 10대 남자아이들과 젊은 남성들을 노린 연쇄 살인범 제프리 다머. 그는 어떻게 그 오랜 세월 동안 살인을 저지를 수 있었을까?"
  // popularity: 6336.256
  // poster_path: "/f2PVrphK0u81ES256lw3oAZuF3x.jpg"
  // vote_average: 8.3
  // vote_count: 939
  const MovieFigure = movieList?.length ? MovieRowSearch : MovieRowContent;
  return (
    <StyledMovieRow className="row">
      <h2>{title}</h2>
      {/*  <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div> */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        autoHeight={true}
        loop={false}
        // spaceBetween={50}
        // slidesPerView={3}
        // navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div id={id} className="row__posters">
          {!movies.length ? (
            <div>
              <SwiperSlide key="noResult">
                <figure>
                  <img
                    alt="결과가 없습니다"
                    style={{
                      cursor: "pointer",
                    }}
                    // key={movie.id}
                    className="row__poster"
                    src="/noResult.jpg"
                  />
                  <div
                    className="overlay"
                    style={{ height: "100%", backdropFilter: "blur(10px)" }}
                  >
                    <div
                      className="description"
                      style={{
                        fontSize: "x-small",
                      }}
                    >
                      결과가 없습니다
                    </div>
                  </div>
                </figure>
              </SwiperSlide>
            </div>
          ) : (
            movies.map((movie) => {
              return (
                movie.backdrop_path && (
                  <SwiperSlide key={movie.id}>
                    <MovieFigure movie={movie} />
                    {/* <figure>
                      <img
                        alt={movie.title || movie.original_title}
                        style={{
                          cursor: "pointer",
                        }}
                        // key={movie.id}
                        className="row__poster"
                        src={
                          movieList
                            ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
                            : `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        }
                        onClick={() => console.log("안녕하세요")}
                      />
                      <div
                        className="overlay"
                        style={movieList ? { height: "100%" } : {}}
                      >
                        <div
                          className="description"
                          style={
                            movieList
                              ? {
                                  fontSize: "x-small",
                                  cursor: "pointer",
                                }
                              : {}
                          }
                        >
                          {movie.title || movie.original_title}
                        </div>
                      </div>
                    </figure> */}
                  </SwiperSlide>
                )
              );
            })
          )}
        </div>
        {/* <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div> */}
        <div className="swiper-button-prev arrow"></div>
        <div className="swiper-button-next arrow"></div>
      </Swiper>
      {/* {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )} */}{" "}
    </StyledMovieRow>
  );
}

export default MovieRow;

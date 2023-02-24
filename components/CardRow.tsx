import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { StyledMovieRow } from "../styles/StyledMovieRow";
import Card from "./board/card/Card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CardRow = ({ articles, setArticles }) => {
  return (
    <StyledMovieRow className="container" style={{ height: "350px" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        autoHeight={true}
        loop={false}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        // pagination={{ clickable: false }}
        breakpoints={{
          1378: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          998: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          625: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
      >
        {articles.map((article) => {
          return (
            <SwiperSlide key={article.documentId}>
              <Card
                article={article}
                key={article.documentId}
                className="col-12"
                setArticles={setArticles}
              />
            </SwiperSlide>
          );
        })}
        <div className="swiper-button-prev arrow"></div>
        <div className="swiper-button-next arrow"></div>
      </Swiper>
    </StyledMovieRow>
  );
};

export default CardRow;

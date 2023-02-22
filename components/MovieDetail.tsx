import React, { useState } from "react";
import styled from "styled-components";
import { BgImg } from "../pages";
import GrayScaleMasthead from "../styles/GrayScaleMasthead";
import GrayScaleMastheadH1 from "../styles/GrayScaleMastheadH1";
import CardCreate from "./board/card/CardCreate";

// 넣을거
// 1. 텍스트 6줄 이상일 때 말줄임표
// 2. 밑 25% 공간에 '영화 일기 보러가기' '새 일기 작성' '관객  평가'
const MovieDetail = ({ onClose, movie }) => {
  //   adult: false,
  //   backdrop_path: /8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg,
  //   belongs_to_collection: [object Object],
  //   budget: 0,
  //   genres: [{"id":12,"name":"모험"},{"id":878,"name":"SF"},{"id":35,"name":"코미디"}],
  //   homepage: ,
  //   id: 640146,
  //   imdb_id: tt10954600,
  //   original_language: en,
  //   original_title: Ant-Man and the Wasp: Quantumania,
  //   overview: 슈퍼히어로 파트너인 스캇 랭과 호프 반 다인, 호프의 부모 재닛 반 다인과 행크 핌, 그리고 스캇의 딸 캐시 랭까지 미지의 양자 영역 세계 속에 빠져버린 앤트맨 패밀리. 그 곳에서 새로운 존재들과 무한한 우주를 다스리는 정복자 캉을 만나며, 그 누구도 예상 못 한 모든 것의 한계를 뛰어넘는 모험을 시작하게 되는데…',
  //   popularity: 2075.264',
  //   poster_path: /cw6jBnTauNmEEIIXcoNEyoQItG7.jpg,
  //   production_companies: [{"id":420,"logo_path":"/hUzeosd33nzE5MCNsZxCGEKTXaQ.png","name":"Marvel Studios","origin_country":"US"},{"id":176762,"logo_path":null,"name":"Kevin Feige Productions","origin_country":"US"}],
  //   production_countries: [{"iso_3166_1":"US","name":"United States of America"}],
  //   release_date: 2023-02-10,
  //   revenue: 250000000,
  //   runtime: 125,
  //   spoken_languages: [{"english_name":"English","iso_639_1":"en","name":"English"}],
  //   status: Released,
  //   tagline: 모든 것을 지배할 정복자가 온다,
  //   title: 앤트맨과 와스프: 퀀텀매니아,
  //   video: false,
  //   vote_average: 6.503,
  //   vote_count: 539,
  // const movie = {
  //   backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  //   poster_path: "/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg",
  //   original_title: "Ant-Man and the Wasp: Quantumania",
  //   overview:
  //     "슈퍼히어로 파트너인 스캇 랭과 호프 반 다인, 호프의 부모 재닛 반 다인과 행크 핌, 그리고 스캇의 딸 캐시 랭까지 미지의 양자 영역 세계 속에 빠져버린 앤트맨 패밀리. 그 곳에서 새로운 존재들과 무한한 우주를 다스리는 정복자 캉을 만나며, 그 누구도 예상 못 한 모든 것의 한계를 뛰어넘는 모험을 시작하게 되는데…",
  //   title: "앤트맨과 와스프: 퀀텀매니아",
  //   tagline: "모든 것을 지배할 정복자가 온다",
  //   release_date: "2023-02-10",
  //   vote_average: "6.503",
  //   genres: [
  //     { id: 12, name: "모험" },
  //     { id: 878, name: "SF" },
  //     { id: 35, name: "코미디" },
  //   ],
  // };
  const [creating, setCreating] = useState(false);
  const setTriggered = () => {
    setCreating(false);
  };
  return (
    <GrayScaleMastheadH1>
      <StyledImage
        src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`}
      ></StyledImage>

      <header className={`masthead`}>
        <div
          role="button"
          className="position-absolute top-0 end-0"
          onClick={onClose}
        >
          닫기{" "}
        </div>
        <h1 className="">{movie.original_title || movie.title}</h1>
        <h2 className="text-white-60 mx-auto mb-4">{movie.title}</h2>
        <StyledContainer>
          <div className="detail-image-container">
            {creating ? (
              <CardCreate
                setCreating={setCreating}
                setTrigger={setTriggered}
                intialMovie={movie}
                className="col-9 mx-auto"
              ></CardCreate>
            ) : (
              <img
                className="detail-image"
                src={`https://image.tmdb.org/t/p/w300/${
                  movie.poster_path || movie.backdrop_path
                }`}
              ></img>
            )}
          </div>

          <div className="detail-text-wrapper">
            <h2
              className="text-white-60 mx-auto mb-4"
              style={{ letterSpacing: "normal" }}
            >
              {movie.tagline || ""}
            </h2>
            <div className="footer-wrapper">
              <div>{`개봉일: ${movie.release_date}`}</div>
              <div>
                {`평점: 
                ${(
                  Math.floor(Number(movie.vote_average) * 100) / 100
                ).toString()}`}
              </div>
              <div>{`장르 : ${movie.genres
                .map((e) => e.name)
                .slice(0, 3)
                .join(", ")}`}</div>
            </div>
            <div className="detail-text">{movie.overview}</div>
            <div className="button-wrapper">
              {creating ? (
                <></>
              ) : (
                <button
                  type="button"
                  className={`btn btn-outline-light ml-auto`}
                  onClick={() => setCreating(true)}
                  name="creatMovieCard"
                >
                  영화일기 작성하기
                </button>
              )}
            </div>
          </div>
        </StyledContainer>
      </header>
    </GrayScaleMastheadH1>
  );
};

export default MovieDetail;

const StyledImage = styled(BgImg)`
  width: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  height: 340px;

  .row {
    /* background-color: black; */
    background-color: black;
    height: 100%;
  }
  @media (max-width: 768px) {
    display: block;
    height: 100vh;
    .row {
      height: 60vh;
    }
  }
  @media (min-width: 992px) {
    display: flex;
    height: 450px;
    .row {
      background-color: black;
      height: 100%;
    }
  }
  .detail-image-container {
    height: 75%;
    width: 40%;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 768px) {
      width: 100%;
      height: 300px;
    }
  }
  .detail-image {
    height: 100%;
  }
  .detail-text-wrapper {
    display: block;
    align-items: center;
    height: 75%;
    width: 60%;
    padding: 1rem;
    margin: 0 auto;
    @media (min-width: 768px) {
      padding-right: 5rem;
    }
    @media (min-width: 1400px) {
      font-size: large;
    }
  }
  .detail-text {
    text-overflow: ellipsis;
    overflow: hidden;

    display: -webkit-box;
    -webkit-line-clamp: 6; // 원하는 라인수
    -webkit-box-orient: vertical;

    @media (min-width: 1400px) {
      font-size: large;
    }
  }
  .button-wrapper {
    width: 100%;
    /* background-color: black; */
    text-align: center;
    margin-top: 2rem;
  }
  .footer-wrapper {
    display: flex;
    justify-content: space-around;
    font-size: small;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      font-size: xx-small;
    }
  }
`;

// {
//   adult: ${movie.adult},
//   backdrop_path: ${movie.backdrop_path},
//   belongs_to_collection: ${movie.belongs_to_collection},
//   budget: ${movie.budget},
//   genres: ${JSON.stringify(movie.genres)},
//   homepage: ${movie.homepage},
//   id: ${movie.id},
//   imdb_id: ${movie.imdb_id},
//   original_language: ${movie.original_language},
//   original_title: ${movie.original_title},
//   overview: ${movie.overview}',
//   popularity: ${movie.popularity}',
//   poster_path: ${movie.poster_path},
//   production_companies: ${JSON.stringify(movie.production_companies)},
//   production_countries: ${JSON.stringify(movie.production_countries)},
//   release_date: ${movie.release_date},
//   revenue: ${movie.revenue},
//   runtime: ${movie.runtime},
//   spoken_languages: ${JSON.stringify(movie.spoken_languages)},
//   status: ${movie.status},
//   tagline: ${movie.tagline},
//   title: ${movie.title},
//   video: ${movie.video},
//   vote_average: ${movie.vote_average},
//   vote_count: ${movie.vote_count},
//   }

//   adult: false,
//   backdrop_path: /8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg,
//   belongs_to_collection: [object Object],
//   budget: 0,
//   genres: [{"id":12,"name":"모험"},{"id":878,"name":"SF"},{"id":35,"name":"코미디"}],
//   homepage: ,
//   id: 640146,
//   imdb_id: tt10954600,
//   original_language: en,
//   original_title: Ant-Man and the Wasp: Quantumania,
//   overview: 슈퍼히어로 파트너인 스캇 랭과 호프 반 다인, 호프의 부모 재닛 반 다인과 행크 핌, 그리고 스캇의 딸 캐시 랭까지 미지의 양자 영역 세계 속에 빠져버린 앤트맨 패밀리. 그 곳에서 새로운 존재들과 무한한 우주를 다스리는 정복자 캉을 만나며, 그 누구도 예상 못 한 모든 것의 한계를 뛰어넘는 모험을 시작하게 되는데…',
//   popularity: 2075.264',
//   poster_path: /cw6jBnTauNmEEIIXcoNEyoQItG7.jpg,
//   production_companies: [{"id":420,"logo_path":"/hUzeosd33nzE5MCNsZxCGEKTXaQ.png","name":"Marvel Studios","origin_country":"US"},{"id":176762,"logo_path":null,"name":"Kevin Feige Productions","origin_country":"US"}],
//   production_countries: [{"iso_3166_1":"US","name":"United States of America"}],
//   release_date: 2023-02-10,
//   revenue: 250000000,
//   runtime: 125,
//   spoken_languages: [{"english_name":"English","iso_639_1":"en","name":"English"}],
//   status: Released,
//   tagline: 모든 것을 지배할 정복자가 온다,
//   title: 앤트맨과 와스프: 퀀텀매니아,
//   video: false,
//   vote_average: 6.503,
//   vote_count: 539,
//   }

import React from "react";
import styled from "styled-components";
import { BgImg } from "../pages";
import GrayScaleMasthead from "../styles/GrayScaleMasthead";

const MovieDetail = ({}) => {
  console.log();
  return (
    <GrayScaleMasthead>
      <StyledImage src={"/backgroundImages/쇼생크탈출.jpg"}></StyledImage>
      <header className={`masthead px-0`}>
        <h1 className="">TEAL AND ORAGNE</h1>
        <div>반가워요</div>
        {/* <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center masthead-text">
          <h2 className="text-white-50 mx-auto mt-3 mb-5">
            슈퍼히어로 파트너인 스캇 랭과 호프 반 다인, 호프의 부모 재닛 반
            다인과 행크 핌, 그리고 스캇의 딸 캐시 랭까지 미지의 양자 영역 세계
            속에 빠져버린 앤트맨 패밀리. 그 곳에서 새로운 존재들과 무한한 우주를
            다스리는 정복자 캉을 만나며, 그 누구도 예상 못 한 모든 것의 한계를
            뛰어넘는 모험을 시작하게 되는데…
          </h2>
          <div className="d-flex justify-content-center">
            <div className={`text-center`}>안녕하세요</div>
          </div>
        </div> */}
      </header>
    </GrayScaleMasthead>
  );
};

export default MovieDetail;

const StyledImage = styled(BgImg)`
  width: 100%;
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

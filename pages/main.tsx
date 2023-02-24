import React, { useEffect } from "react";
import MovieRow from "../components/MovieRow";
import tmdbApi, { requests } from "../services/tmdbApi";
import { Movie, MovieEssential } from "../types/moive";
import fs from "fs";
import path from "path";
import { useTypedSelector } from "../store";
import { authService } from "../public/fbase";
import { fetchProfile } from "../services/fbProfile";
import { shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserOjbect, setUserProfile } from "../store/authSlice";
import { fetchTrending } from "../services/fbDb";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { StyledMovieRow } from "../styles/StyledMovieRow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import styled from "styled-components";
import Card, { StyledCard } from "../components/board/card/Card";
import { useRouter } from "next/router";
import CardGrid from "../components/board/card/CardGrid";
import { setTrendingArticles } from "../store/dbSlice";
import { StyledBoardHeader } from "../components/board/BoardHeader";
import CardRow from "../components/CardRow";

interface iProps {
  moviesObject: { [key: string]: [Movie] };
  preloadingData: Array<string>;
  validate: number;
}

const MainPage = ({ moviesObject }: iProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const myRecommendations = useTypedSelector(
    (state) => state.authSlice.userProfile.myRecommendations,
    shallowEqual,
  );
  const trendingArticles = useTypedSelector(
    (state) => state.dbSlice.trendingArticles,
    shallowEqual,
  );

  useEffect(() => {
    if (myRecommendations.length) return;
    authService.onAuthStateChanged((crrUser) => {
      const uid = crrUser?.uid;
      if (!uid) return;
      fetchProfile(uid).then((res) => {
        dispatch(setUserOjbect(crrUser));
        dispatch(setUserProfile(res));
      });
    });
  }, []);

  const getTrending = () => {
    // if (trendingArticles.length) return;
    fetchTrending().then((res) => {
      dispatch(setTrendingArticles(res));
    });
  };
  useEffect(() => {
    if (trendingArticles.length) return;
    getTrending();
  }, []);

  const MoviesDataEntries: Array<[string, [Movie]]> = [
    ["요즘 뜨는 영화", moviesObject["fetchTrending"]],
    ["점수가 높은 영화", moviesObject["fetchTopRated"]],
    ["짜릿한 액션 영화", moviesObject["fetchActionMovies"]],
    ["즐거운 코미디 영화", moviesObject["fetchComedyMovies"]],
    ["으스스한 공포 영화", moviesObject["fetchHorrorMovies"]],
    ["놀라운 다큐멘터리", moviesObject["fetchDocumentaries"]],
  ];

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="col-12 col-lg-10" id="main">
          {/* 카드 리스트 입니다. */}
          <StyledBoardHeader className="container">
            <div className="row">
              <div className="col text-center">
                <h2 className="h4">인기 영화 일기</h2>
                <div
                  className={`lead eddting-text fs-5 mb-2`}
                  onClick={() => {
                    router.push("/board");
                  }}
                >
                  더보기
                </div>
              </div>
            </div>
          </StyledBoardHeader>
          <CardRow articles={trendingArticles} setArticles={getTrending} />
          {/* 영화 리스트입니다. */}
          {myRecommendations.length ? (
            <MovieRow
              id="my-recommendations"
              key="my-recommendation"
              title="나를 위한 추천 영화"
              moviesData={myRecommendations}
            />
          ) : (
            <>
              <MovieRow
                id="my-recommendations"
                key="my-recommendation"
                title="나를 위한 추천 영화"
                moviesData={[]}
              />
            </>
          )}
          {MoviesDataEntries.map((e) => {
            return (
              <MovieRow id={e[0]} key={e[0]} title={e[0]} moviesData={e[1]} />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;

const NoResultCard = styled.div`
  .card {
    border: none;
    transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
    overflow: hidden;
    border-radius: 20px;
    min-height: 350px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    .card {
      min-height: 350px;
    }
  }
  @media (max-width: 420px) {
    .card {
      min-height: 300px;
    }
  }
`;

export const getStaticProps = async () => {
  const requestsUrl = Object.entries(requests);
  const moviesObject = new Object();
  return await Promise.allSettled(
    requestsUrl.map((e) => {
      let movieEssentialArray;
      return tmdbApi.get(e[1]).then((res) => {
        movieEssentialArray = res.data.results.map((e: Movie) => {
          const { id, title, backdrop_path, poster_path } = e;
          return { id, title, backdrop_path, poster_path };
        });
        moviesObject[e[0]] = movieEssentialArray as Array<MovieEssential>;
      });
    }),
  ).then(() => {
    const validate = Math.floor(Date.now() / 1000);
    const preloadingData = [];
    Object.values(moviesObject).map((e) =>
      e.slice(0, 6).map((e) => {
        if (!e.backdrop_path) return "";
        const { backdrop_path } = e;
        return preloadingData.push(backdrop_path);
      }),
    );
    const filePath = path.resolve(
      path.join(process.cwd(), "public", "preloadingData.json"),
    );
    fs.writeFileSync(
      filePath,
      JSON.stringify({ validate, preloadData: preloadingData }),
    );
    return {
      props: { moviesObject, preloadingData, validate },
      revalidate: 4 * 24 * 60 * 60,
    };
  });
};

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

interface iProps {
  moviesObject: { [key: string]: [Movie] };
  preloadingData: Array<string>;
  validate: number;
}

const MainPage = ({ moviesObject }: iProps) => {
  const dispatch = useDispatch();
  const myRecommendations = useTypedSelector(
    (state) => state.authSlice.userProfile.myRecommendations,
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

  useEffect(() => {
    fetchTrending();
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

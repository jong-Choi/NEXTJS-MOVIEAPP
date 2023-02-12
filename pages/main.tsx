import React, { useEffect } from "react";
import MovieRow from "../components/MovieRow";
import { patchPreload } from "../services/fbDb";
import tmdbApi, { requests } from "../services/tmdbApi";
import { Movie } from "../types/moive";

interface iProps {
  moviesObject: { [key: string]: [Movie] };
  preloadingData: Array<string>;
  validate: number;
}

const main = ({ moviesObject, preloadingData, validate }: iProps) => {
  useEffect(() => {
    const currentDate = Math.floor(Date.now() / 1000);
    if (currentDate - validate <= 15) {
      // patchPreload(validate, preloadingData);
    }
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
    <div className="container d-flex justify-content-center">
      <div className="col-12 col-lg-10">
        {MoviesDataEntries.map((e) => {
          return (
            <MovieRow id={e[0]} key={e[0]} title={e[0]} moviesData={e[1]} />
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const requestsUrl = Object.entries(requests);
  const moviesObject = new Object();
  return await Promise.allSettled(
    requestsUrl.map((e) => {
      return tmdbApi.get(e[1]).then((res) => {
        moviesObject[e[0]] = res.data.results;
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
    return {
      props: { moviesObject, preloadingData, validate },
      revalidate: 4 * 24 * 60 * 60,
    };
  });
};

export default main;

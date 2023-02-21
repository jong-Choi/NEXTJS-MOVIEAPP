import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Modal from "react-modal";
import MovieDetail from "../components/MovieDetail";
import MovieRow from "../components/MovieRow";
import { patchPreload } from "../services/fbDb";
import tmdbApi, { requests } from "../services/tmdbApi";
import { useTypedSelector } from "../store";
import { Movie, MovieEssential } from "../types/moive";

interface iProps {
  moviesObject: { [key: string]: [Movie] };
  preloadingData: Array<string>;
  validate: number;
}

const main = ({ moviesObject, preloadingData, validate }: iProps) => {
  const router = useRouter();

  // const dbValidate = useTypedSelector((state) => state.dbSlice.dbValidate);
  // useEffect(() => {
  //   if (dbValidate !== validate) {
  //     patchPreload(validate, preloadingData);
  //   }
  // }, []);

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
        <div className="col-12 col-lg-10" id="#__next3">
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

import fs from "fs";
import path from "path";

export const getStaticProps = async () => {
  const requestsUrl = Object.entries(requests);
  const moviesObject = new Object();
  return await Promise.allSettled(
    requestsUrl.map((e) => {
      let movieEssentialArray;
      return tmdbApi.get(e[1]).then((res) => {
        movieEssentialArray = res.data.results.map((e: Movie) => {
          const { id, title, backdrop_path } = e;
          return { id, title, backdrop_path };
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
    fs.writeFileSync(filePath, JSON.stringify({ validate, preloadingData }));
    return {
      props: { moviesObject, preloadingData, validate },
      revalidate: 4 * 24 * 60 * 60,
    };
  });
};

export default main;

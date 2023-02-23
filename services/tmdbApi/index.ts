import axios from "axios";
import { MyMovie } from "../../types/moive";

const tmdb_api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: tmdb_api_key,
    language: "ko-KR",
  },
});

export const getRecommenations = async (movie_id: number) => {
  return await tmdbApi.get(`/movie/${movie_id}/recommendations`);
};
export const getMovieDetail = async (movieId: number) => {
  return await tmdbApi.get(`/movie/${movieId}`);
};
export const getSearchData = async (searchValue) => {
  return await tmdbApi.get(
    `/search/movie?include_adult=false&query=${searchValue}`,
  );
};

export const newRecommendations = (myMovies: Array<MyMovie>) => {
  const map: Map<number, MyMovie> = new Map();
  const set: Set<number> = new Set();
  const newArray = [];
  let recommendations;
  return Promise.allSettled(
    myMovies.map((movie) => {
      set.add(movie.id);
      return getRecommenations(movie.id).then((res) => {
        newArray.push(...res.data.results.slice(0, 10));
      });
    }),
  ).then(() => {
    newArray.forEach((movie) => {
      if (!set.has(movie.id) && !map.has(movie.id) && movie.backdrop_path)
        map.set(movie.id, {
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          genre_ids: movie.genre_ids,
        });
    });
    const keys = Array.from(map.keys());
    keys.sort(() => 0.5 - Math.random());
    recommendations = keys.slice(0, 20).map((key) => map.get(key));
    return recommendations;
  });
};

export const requests = {
  fetchNowPlaying: "/movie/now_playing",
  fetchTrending: "/trending/movie/week",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
};

export default tmdbApi;

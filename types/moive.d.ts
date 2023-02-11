export interface MyMovie {
  backdrop_path: string;
  title: string;
  id: number;
  genre_ids: Array<number>;
}

export interface Movie extends MyMovie {
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

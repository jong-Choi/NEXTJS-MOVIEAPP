export interface MovieEssential {
  backdrop_path: string;
  poster_path?: string;
  title: string;
  id: number;
}

export interface MyMovie extends MovieEssential {
  genre_ids: Array<number>;
}

export interface Movie extends MyMovie {
  poster_path: string;
  adult: boolean;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

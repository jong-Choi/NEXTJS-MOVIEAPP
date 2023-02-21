import React from "react";
import StyledModalCard from "../styles/StyledModalCard";

const MovieDetail = ({ movie }) => {
  console.log(movie);
  return (
    <>
      <StyledModalCard>
        <pre>
          {`
{
adult: ${movie.adult}, 
backdrop_path: ${movie.backdrop_path},
belongs_to_collection: ${movie.belongs_to_collection},
budget: ${movie.budget},
genres: ${JSON.stringify(movie.genres)},
homepage: ${movie.homepage},
id: ${movie.id},
imdb_id: ${movie.imdb_id},
original_language: ${movie.original_language},
original_title: ${movie.original_title},
overview: ${movie.overview}',
popularity: ${movie.popularity}',
poster_path: ${movie.poster_path},
production_companies: ${JSON.stringify(movie.production_companies)},
production_countries: ${JSON.stringify(movie.production_countries)},
release_date: ${movie.release_date},
revenue: ${movie.revenue},
runtime: ${movie.runtime},
spoken_languages: ${JSON.stringify(movie.spoken_languages)},
status: ${movie.status},
tagline: ${movie.tagline},
title: ${movie.title},
video: ${movie.video},
vote_average: ${movie.vote_average},
vote_count: ${movie.vote_count},
}
`}
        </pre>
      </StyledModalCard>
    </>
  );
};

export default MovieDetail;

/* {`
{
adult: ${movie.adult},
backdrop_path: ${movie.backdrop_path},
belongs_to_collection: ${movie.belongs_to_collection},
budget: ${movie.budget},
genres: ${JSON.stringify(movie.genres)},
homepage: ${movie.homepage},
id: ${movie.id},
imdb_id: ${movie.imdb_id},
original_language: ${movie.original_language},
original_title: ${movie.original_title},
overview: ${movie.overview}',
popularity: ${movie.popularity}',
poster_path: ${movie.poster_path},
production_companies: ${JSON.stringify(movie.production_companies)},
production_countries: ${JSON.stringify(movie.production_countries)},
release_date: ${movie.release_date},
revenue: ${movie.revenue},
runtime: ${movie.runtime},
spoken_languages: ${JSON.stringify(movie.spoken_languages)},
status: ${movie.status},
tagline: ${movie.tagline},
title: ${movie.title},
video: ${movie.video},
vote_average: ${movie.vote_average},
vote_count: ${movie.vote_count},
}
`} */

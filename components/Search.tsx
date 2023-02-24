import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchData } from "../services/tmdbApi";
import StyledForm from "../styles/StyledForm";
import useDebounce from "../utils/useDebounce";
import MovieRow from "./MovieRow";
import Input from "./common/Input";
import { Movie } from "../types/moive";
import SearchResult from "./SearchResult";

interface iProps {
  label?: string;
  onResultClick?: (movie: Movie) => any;
  disabled?: boolean;
  cardMode?: boolean;
  mainMode?: boolean;
}

const Search = ({
  label,
  onResultClick = (movie) => {},
  disabled = false,
  cardMode = false,
}: iProps) => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const debouncedInput = useDebounce(input, 500);
  useEffect(() => {
    if (disabled) {
      setInput("");
      setMovies([]);
    }
  }, [disabled]);

  useEffect(() => {
    if (!debouncedInput) return setMovies([]);
    getSearchData(debouncedInput).then((res) => {
      setMovies(res.data.results);
    });
  }, [debouncedInput]);

  return (
    <div>
      <StyledForm>
        <Input
          placeholder={label || "인생 영화를 검색하세요"}
          state={input}
          setState={setInput}
          disabled={disabled}
        ></Input>
      </StyledForm>
      <div className="d-flex justify-content-center">
        <SearchResult
          debouncedInput={debouncedInput}
          input={input}
          movies={movies}
          onResultClick={onResultClick}
          cardMode={cardMode}
        />
      </div>
    </div>
  );
};

export default Search;

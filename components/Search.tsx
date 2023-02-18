import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchData } from "../services/tmdbApi";
import StyledForm from "../styles/StyledForm";
import useDebounce from "../utils/useDebounce";
import MovieRow from "./MovieRow";
import Input from "./common/Input";
import { Movie } from "../types/moive";

interface iProps {
  label?: string;
  onResultClick?: (movie: Movie) => any;
  disabled?: boolean;
  cardMode?: boolean;
}

const Search = ({
  label,
  onResultClick = (movie) => {},
  disabled = false,
  cardMode = false,
}: iProps) => {
  const [input, setInput] = useState("");
  const [movies, setMoives] = useState<Array<Movie>>([]);
  const debouncedInput = useDebounce(input, 500);
  useEffect(() => {
    if (disabled) {
      setInput("");
      setMoives([]);
    }
  }, [disabled]);

  useEffect(() => {
    if (!debouncedInput) return setMoives([]);
    getSearchData(debouncedInput).then((res) => {
      setMoives(res.data.results);
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
        >
          <StyledSearchResults
            className={debouncedInput && input ? "" : "d-none"}
          >
            <div className="RowContainer">
              <MovieRow
                title=""
                id="SearchResult"
                movieList={movies}
                onResultClick={onResultClick}
                cardMode={cardMode}
              ></MovieRow>
            </div>
          </StyledSearchResults>
        </Input>
      </StyledForm>
    </div>
  );
};

export default Search;

export const StyledSearchResults = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  width: 100%;

  backdrop-filter: blur(10px);
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  .RowContainer {
    padding-top: 1rem;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  /*
  https://stackoverflow.com/questions/63213956/when-loading-swiper-slide-height-changes
  */
  .row__posters {
    height: 8vh;
  }
`;

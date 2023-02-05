import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchData } from "../services/tmdbApi";
import StyledForm from "../styles/StyledForm";
import useDebounce from "../utils/useDebounce";
import MovieRow from "./MovieRow";

interface iProps {
  label?: string;
  onResultClick?: React.MouseEventHandler;
}

const Search = ({ label, onResultClick }: iProps) => {
  const [input, setInput] = useState("");
  const [movies, setMoives] = useState([]);
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    if (!debouncedInput) return;
    getSearchData(debouncedInput).then((res) => setMoives(res.data.results));
  }, [debouncedInput]);
  return (
    <StyledForm className="form-floating">
      <input
        className="form-control text-center"
        type="text"
        name="text"
        placeholder="인생 영화를 검색하세요"
        onChange={(e) => setInput(e.target.value)}
      />
      <label htmlFor="floatingInput">
        {label ? label : "인생 영화를 검색하세요"}
      </label>
      <div className={debouncedInput ? "" : "d-none"}>
        <StyledSearchResults>
          <div className="RowContainer">
            <MovieRow
              title="검색결과"
              id="SearchResult"
              movieList={movies}
            ></MovieRow>
          </div>
        </StyledSearchResults>
      </div>
    </StyledForm>
  );
};

export default Search;

export const StyledSearchResults = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  /* height: 250%; */
  backdrop-filter: blur(10px);
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  .RowContainer {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
  }
`;

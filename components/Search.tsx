import React, { useEffect, useState } from "react";
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
      <div
        className={debouncedInput ? "" : "d-none"}
        style={{
          position: "absolute",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <MovieRow
          title="검색결과"
          id="SearchResult"
          movieList={movies}
        ></MovieRow>
      </div>
    </StyledForm>
  );
};

export default Search;

import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../../utils/useDebounce";
import Search from "../../Search";
import CardTextArea from "./CardTextArea";

const CardBodyEdditing = ({
  setInput,
  movie,
  setMovie,
  defaultMovie = null,
}) => {
  const [searching, setSearching] = useState(true);
  const onResultClick = (movie) => {
    setMovie(movie);
    setSearching(false);
  };

  return (
    <div className="card-body">
      {searching ? (
        <StyledInputWrapper>
          <Search
            label="영화를 검색하세요"
            onResultClick={onResultClick}
            cardMode={true}
          />
        </StyledInputWrapper>
      ) : (
        <small className="card-meta mb-2" onClick={() => setSearching(true)}>
          {movie.title.length > 20
            ? movie.title.slice(0, 18) + "..."
            : movie.title}
        </small>
      )}

      <h4 className="card-title mt-0 ">
        <CardTextArea searching={searching} setInput={setInput} />
      </h4>
    </div>
  );
};

export default React.memo(CardBodyEdditing);

const StyledInputWrapper = styled.div`
  input {
    background: transparent;
    border: none;
    outline: none;
    font-size: x-small;
    color: #26bd75;
    &:focus {
      background: transparent;
      color: #26bd75;
    }
  }
  label {
    font-size: x-small;
  }
`;

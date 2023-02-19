import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../../utils/useDebounce";
import Search from "../../Search";
import CardTextArea from "./CardTextArea";

const CardBodyEditing = ({ setInput, movie, setMovie, input = "" }) => {
  const [searching, setSearching] = useState(() => {
    if (movie.title) return false;
    else return true;
  });

  const [MovieTitle, setMovieTitle] = useState(() =>
    movie.title.length > 20 ? movie.title.slice(0, 18) + "..." : movie.title,
  );

  const onResultClick = (movie) => {
    setMovie(movie);
    setMovieTitle(
      movie.title.length > 20 ? movie.title.slice(0, 18) + "..." : movie.title,
    );
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
          {MovieTitle}
        </small>
      )}

      <h4 className="card-title mt-0 ">
        <CardTextArea searching={searching} setInput={setInput} input={input} />
      </h4>
    </div>
  );
};

export default React.memo(CardBodyEditing);

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

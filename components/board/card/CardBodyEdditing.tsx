import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Search from "../../Search";

const CardBodyEdditing = ({
  input,
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
        <StyledTextArea
          className={`fs-6 ${searching ? "d-none" : ""}`}
          placeholder="이 영화가 어땠나요?"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          rows={5}
          maxLength={100}
          autoFocus
        ></StyledTextArea>
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

const StyledTextArea = styled.textarea`
  width: 100%;
  color: #fff;
  background: transparent;
  border: none;
  outline: none;
`;

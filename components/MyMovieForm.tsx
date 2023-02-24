import React from "react";
import Input from "./common/Input";
import Search from "./Search";

const MyMovieForm = ({ myMovies, setMyMovies, onResultClick }) => {
  return (
    <>
      <Input name="myMovies" placeholder="나의 인생영화" disabled={true}>
        {!myMovies?.length ? (
          <div className="d-flex justify-content-center small-text-container">
            <div className="text-light small-text">선택된 영화가 없습니다.</div>
          </div>
        ) : (
          <div className="d-flex justify-content-evenly small-text-container">
            {myMovies.map((element, idx) => {
              return (
                <div
                  className="text-light pointer small-text pl-5 text-truncate"
                  style={{ maxWidth: "10vw" }}
                  title="클릭하여 삭제하기"
                  key={element.id}
                  onClick={async (e) => {
                    myMovies.splice(myMovies.indexOf(element), 1);
                    setMyMovies([...myMovies]);
                  }}
                >
                  {element.title}
                </div>
              );
            })}
          </div>
        )}
      </Input>
      <Search
        onResultClick={onResultClick}
        disabled={myMovies.length >= 5 ? true : false}
      />
    </>
  );
};

export default MyMovieForm;

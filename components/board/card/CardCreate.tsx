import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { authService } from "../../../public/fbase";
import { createArticle } from "../../../services/fbDb";
import { fetchProfile } from "../../../services/fbProfile";
import { useTypedSelector } from "../../../store";
import { Article } from "../../../types/article";
import { toastSuccess } from "../../../utils/toastAlert";
import { StyledCard } from "./Card";
import CardBodyEdditing from "./CardBodyEdditing";

const CardCreate = ({ setCreating }) => {
  const initalMovie = {
    backdrop_path: "",
    title: "",
    id: "",
  };
  const [input, setInput] = useState("");
  const [movie, setMovie] = useState(initalMovie);
  const [imageURL, setImageURL] = useState("/noResult.jpg");
  const [canCreate, setCanCreate] = useState(false);
  const { uid, nickname, image } = useTypedSelector((state) => {
    return state.authSlice.userProfile;
  }, shallowEqual);

  useEffect(() => {
    if (movie.title && input) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [movie, input]);

  useEffect(() => {
    if (movie.backdrop_path) {
      setImageURL(`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`);
    } else {
      setImageURL("/noResult.jpg");
    }
  }, [movie]);

  const resetState = () => {
    setInput("");
    setMovie(initalMovie);
    setImageURL("/noResult.jpg");
    setCanCreate(false);
    setCreating(false);
  };

  const onCreate = () => {
    const article: Article = {
      title: movie.title,
      body: input,
      backdrop_path: movie.backdrop_path,
      published_date: Date.now(),
      author: {
        image,
        uid,
        nickname,
      },
      likes: [],
    };

    if (movie.title && uid && input)
      createArticle(article).then(() => {
        toastSuccess("작성되었습니다.");
        resetState();
      });
  };

  return (
    <StyledCard className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div
        className="card text-white card-has-bg click-col"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      >
        <img
          className="card-img d-none"
          src={`${imageURL}`}
          alt={movie?.title}
        />
        <div className="card-img-overlay d-flex flex-column">
          <CardBodyEdditing
            input={input}
            setInput={setInput}
            movie={movie}
            setMovie={setMovie}
          ></CardBodyEdditing>

          {/* <CardInfo></CardInfo> */}
          <div className="card-footer likes ">
            <small
              className={`create-button ${canCreate ? "" : "invisible"}`}
              onClick={onCreate}
            >
              작성하기
            </small>
          </div>
          {/* <CardBodyEdditing /> */}
        </div>
      </div>
    </StyledCard>
  );
};

export default CardCreate;

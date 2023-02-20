import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { authService } from "../../../public/fbase";
import { createArticle, fetchAticles } from "../../../services/fbDb";
import { fetchProfile } from "../../../services/fbProfile";
import { useTypedSelector } from "../../../store";
import { setArticles } from "../../../store/dbSlice";
import { Article } from "../../../types/article";
import { toastSuccess } from "../../../utils/toastAlert";
import { StyledCard } from "./Card";
import CardBodyEditing from "./CardBodyEditing";

const CardCreate = ({ setCreating, setTrigger }) => {
  const initalMovie = {
    backdrop_path: "",
    title: "",
    id: "",
  };
  const dispatch = useDispatch();
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
        toastSuccess("게시글이 작성되었습니다.");
        setTrigger();
        setCanCreate(false);
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
          <CardBodyEditing
            setInput={setInput}
            movie={movie}
            setMovie={setMovie}
          ></CardBodyEditing>
          <div className={`card-footer likes`}>
            <div>
              <small
                className={`create-button ${!canCreate ? "invisible" : ""}`}
                onClick={onCreate}
              >
                작성하기
              </small>
              <br />
              <small
                className={`create-button`}
                onClick={() => {
                  setCreating(false);
                }}
              >
                취소
              </small>
            </div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

export default CardCreate;

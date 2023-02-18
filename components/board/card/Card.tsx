import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useTypedSelector } from "../../../store";
import { Article } from "../../../types/article";
import CardBody from "./CardBody";
import CardBodyEdditing from "./CardBodyEdditing";
import CardFooter from "./CardFooter";

interface iProp {
  article: Article;
}

const Card = ({ article }: iProp) => {
  const uid = useTypedSelector((state) => state.authSlice.userProfile?.uid);
  const [articleSnapshot, setArticleSnapshot] = useState(article);
  const { backdrop_path, title, likes, author, published_date } =
    articleSnapshot;
  const isAuth = article.author.uid === uid;
  const hasLiked = !!article.likes.includes(uid);
  const [load, setLoad] = useState(false);

  const [isEdditing, setIsEdditing] = useState(false);

  const Overlay = useMemo(() => {
    if (isEdditing) return <></>;
    if (isAuth) {
      return <div onClick={() => setIsEdditing(true)}>클릭해서 수정하기</div>;
    } else if (likes.includes(uid)) {
      return (
        <div
          onClick={() => {
            likes.splice(likes.indexOf(uid), 1);
            setArticleSnapshot({
              ...articleSnapshot,
              likes: [...likes],
            });
          }}
        >
          클릭해서 좋아요 취소
        </div>
      );
    } else {
      return (
        <div
          onClick={() =>
            setArticleSnapshot({
              ...articleSnapshot,
              likes: [...likes, uid],
            })
          }
        >
          클릭해서 좋아요
        </div>
      );
    }
  }, [likes, isEdditing]);

  return (
    <StyledCard className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div
        className={`card text-white card-has-bg click-col 

        `}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w780/${article.backdrop_path}")`,
        }}
      >
        <img
          className="card-img d-none"
          src={`https://image.tmdb.org/t/p/w780/${article.backdrop_path}`}
          alt={article.title}
          onLoad={() => setLoad(true)}
        />

        <div className="card-img-overlay d-flex flex-column">
          <CardBody article={article} likesCount={likes.length} />

          <div className="card-footer likes">
            <small className="">{likes.length}개의 좋아요</small>
          </div>

          <CardFooter
            author={article.author}
            published_date={article.published_date}
          />
        </div>
        <StyledOverlay className="overlay">{Overlay}</StyledOverlay>
      </div>
    </StyledCard>
  );
};

export default Card;

const StyledOverlay = styled.div`
  visibility: hidden;
  position: absolute;
  z-index: 2;
  top: 60%;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const StyledCard = styled.section`
  &:hover .overlay {
    visibility: visible;
  }
  .card-footer:hover {
    transform: scale(1.05);
  }

  .likes:hover {
    transform: scale(1);
  }
  .liked-card {
    color: pink;
  }
  .card:hover .like-texts {
    transform: scale(1.1);
    margin-left: 5px;
    font-weight: 700;
  }

  .eddting-text:hover {
    transform: scale(1.1);
    color: rgb(120, 183, 183);
    font-weight: 700;
  }
  .card-profile {
    margin-left: 10px;
  }
  .card {
    border: none;
    transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
    overflow: hidden;
    border-radius: 20px;
    min-height: 350px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    .card {
      min-height: 350px;
    }
  }
  @media (max-width: 420px) {
    .card {
      min-height: 300px;
    }
  }
  .card.card-has-bg {
    transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .card.card-has-bg:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    -webkit-filter: grayscale(1);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
  }
  .card.card-has-bg:hover {
    transform: scale(0.98);
    box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.3);
    background-size: cover;
    transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  .user-message {
    visibility: hidden;
  }
  .card.card.card-has-bg:hover .user-message {
    visibility: visible;
  }
  .card.card-has-bg:hover .card-img-overlay {
    transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
    background: #234f6d;
    background: linear-gradient(0deg, rgba(4, 69, 114, 0.5) 0%, #044572 100%);
  }
  .card .card-footer {
    background: none;
    border-top: none;
  }
  .card .card-info {
    background: none;
    border-top: none;
  }
  .card .card-footer .media img {
    border: solid 3px rgba(255, 255, 255, 0.3);
  }
  .card .card-meta {
    /* text-overflow: ellipsis;
    white-space: nowrap; */
    color: #26bd75;
  }
  .card .card-body {
    transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  .card:hover {
    cursor: pointer;
    transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  .card:hover .card-body {
    margin-top: 30px;
    transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  .card .card-img-overlay {
    transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
    background: #234f6d;
    background: linear-gradient(
      0deg,
      rgba(35, 79, 109, 0.3785889356) 0%,
      #455f71e7 100%
    );
  }
  .card .create-button {
    cursor: pointer;
    &:hover {
      color: orange;
    }
  }
`;

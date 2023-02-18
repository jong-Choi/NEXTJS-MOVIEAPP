import React from "react";
import styled from "styled-components";
import CardBody from "./CardBody";
import CardBodyEdditing from "./CardBodyEdditing";
import CardFooter from "./CardFooter";

const Card = () => {
  const post = {
    title: "다크나이트",
    body: "으라차챠차",
    backdrop_path: "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    published_date: "2021-02-18",
    author: {
      uid: "1234",
      nickname: "배트맨좋아",
      image: "1.jpg",
    },
    likes: ["1234", "45678"],
  };
  return (
    <StyledCard className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div
        className="card text-white card-has-bg click-col"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w780/${post.backdrop_path}")`,
        }}
      >
        <img
          className="card-img d-none"
          src={`https://image.tmdb.org/t/p/w780/${post.backdrop_path}`}
          alt={post.title}
        />
        <div className="card-img-overlay d-flex flex-column">
          <CardBody post={post} likesCount={post.likes.length} />

          <div className="card-footer likes">
            <small className="">{post.likes.length}개의 좋아요</small>
          </div>
          {/* <CardInfo></CardInfo> */}
          <CardFooter
            author={post.author}
            published_date={post.published_date}
          />
          {/* <CardBodyEdditing /> */}
        </div>
      </div>
    </StyledCard>
  );
};

export default Card;

export const StyledCard = styled.section`
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

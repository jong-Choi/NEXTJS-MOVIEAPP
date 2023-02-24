import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import firebaseInstance, { dbService } from "../../../public/fbase";
import { deleteArticle, updateArticle } from "../../../services/fbDb";
import { useTypedSelector } from "../../../store";
import { Article } from "../../../types/article";
import { toastDefault, toastSuccess } from "../../../utils/toastAlert";
import useDebounce from "../../../utils/useDebounce";
import CardBody from "./CardBody";
import CardBodyEditing from "./CardBodyEditing";
import CardFooter from "./CardFooter";

interface iProp {
  article: Article;
  setArticles: Function;
  className?: string;
}

const Card = ({
  article,
  setArticles,
  className = "col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4",
}: iProp) => {
  const uid = useTypedSelector((state) => state.authSlice.userProfile?.uid);
  const [articleSnapshot, setArticleSnapshot] = useState(article);
  const [onClickHander, setOnclickHandler] = useState();
  const {
    documentId,
    backdrop_path,
    title,
    likes,
    author,
    published_date,
    body,
  } = articleSnapshot;
  const [isAuth, setIsAuth] = useState(article.author.uid === uid);
  useEffect(() => {
    setIsAuth(article.author.uid === uid);
  }, [uid]);

  const [isEditing, setIsEditing] = useState(false);

  const [initiated, setInitiated] = useState(false);
  const hasLiked = useDebounce(likes.includes(uid), 500);
  const docRef = dbService.collection("articles").doc(documentId);

  useEffect(() => {
    if (!initiated) return;
    if (hasLiked) {
      docRef.update({
        likes: firebaseInstance.firestore.FieldValue.arrayUnion(uid),
      });
      setInitiated(false);
    } else if (!hasLiked) {
      docRef.update({
        likes: firebaseInstance.firestore.FieldValue.arrayRemove(uid),
      });
      setInitiated(false);
    }
  }, [hasLiked]);

  const Overlay = useMemo(() => {
    if (isEditing) return <></>;
    if (isAuth) {
      const onClickHandler = () => {
        if (!isEditing) setIsEditing(true);
      };
      return (
        <StyledOverlay className="overlay" onClick={onClickHandler}>
          <div>클릭해서 수정하기</div>
        </StyledOverlay>
      );
    } else if (likes.includes(uid)) {
      const onClickHandler = () => {
        const idx = likes.indexOf(uid);
        if (idx >= 0) likes.splice(idx, 1);
        setInitiated(true);
        setArticleSnapshot({
          ...articleSnapshot,
          likes: [...likes],
        });
      };
      return (
        <StyledOverlay className="overlay" onClick={onClickHandler}>
          <div>클릭해서 좋아요 취소</div>
        </StyledOverlay>
      );
    } else {
      const onClickHandler = () => {
        setInitiated(true);
        setArticleSnapshot({
          ...articleSnapshot,
          likes: [...likes, uid],
        });
      };
      return (
        <StyledOverlay className="overlay" onClick={onClickHandler}>
          <div>클릭해서 좋아요</div>
        </StyledOverlay>
      );
    }
  }, [likes, isEditing]);

  const [movie, setMovie] = useState(() => ({
    backdrop_path,
    title,
  }));
  const [input, setInput] = useState(() => {
    return body;
  });

  const onUpdate = () => {
    const payload = {
      title: movie.title,
      body: input,
      backdrop_path: movie.backdrop_path,
      // published_date: Date.now(),
      // author: author,
      // likes: likes,
    };

    if (uid && uid === author.uid && movie.title && input) {
      if (
        movie.title === title &&
        input === body &&
        movie.backdrop_path === backdrop_path
      ) {
        toastDefault("변경 사항이 없습니다.");
        setIsEditing(false);
      } else {
        updateArticle(documentId, payload).then(() => {
          toastSuccess("게시글이 수정되었습니다.");
          setArticleSnapshot({
            ...articleSnapshot,
            title: movie.title,
            body: input,
            backdrop_path: movie.backdrop_path,
          });
          setIsEditing(false);
        });
      }
    }
  };

  const cardBody = isEditing ? (
    <CardBodyEditing
      setInput={setInput}
      movie={movie}
      setMovie={setMovie}
      input={input}
    ></CardBodyEditing>
  ) : (
    <>
      <CardBody article={articleSnapshot} likesCount={likes.length} />
      <div className="card-footer likes">
        <small>
          <span style={likes.includes(uid) ? { color: "pink" } : {}}>
            {likes.length}개
          </span>
          의 좋아요
        </small>
      </div>
    </>
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = () => {
    deleteArticle(documentId).then(() => {
      toastSuccess("삭제되었습니다.");
      setArticles((prevArticles) => {
        const newArticles = [...prevArticles];
        newArticles.splice(
          newArticles.findIndex((e) => e.documentId === documentId),
          1,
        );
        return newArticles;
      });
    });
  };
  const deleteButton = isDeleting ? (
    <>
      <div>
        <span>삭제하시겠습니까? </span>{" "}
        <UpdateSpan role="button" className="mx-3" onClick={onDelete}>
          예
        </UpdateSpan>{" "}
        <UpdateSpan
          role="button"
          onClick={() => {
            setIsDeleting(false);
          }}
        >
          아니오
        </UpdateSpan>
      </div>
    </>
  ) : (
    <div>
      <UpdateSpan role="button" onClick={() => setIsDeleting(true)}>
        삭제하기
      </UpdateSpan>
    </div>
  );

  const cardFooter = isEditing ? (
    <>
      <div>
        <UpdateSpan role="button" onClick={onUpdate}>
          수정하기
        </UpdateSpan>
        <UpdateSpan
          role="button"
          onClick={() => {
            setMovie({
              backdrop_path,
              title,
            });
            setInput(body);
            setIsEditing(false);
          }}
          className="mx-3"
        >
          취소하기
        </UpdateSpan>
      </div>
      {deleteButton}
    </>
  ) : (
    <CardFooter author={author} published_date={published_date} />
  );

  const ImageBackdropPath = useMemo(() => {
    if (isEditing) return movie.backdrop_path;
    else return backdrop_path;
  }, [isEditing, movie.backdrop_path, backdrop_path]);

  return (
    <StyledCard className={className}>
      <div
        className={`card text-white card-has-bg click-col 

        `}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w780/${ImageBackdropPath}")`,
        }}
      >
        <img
          className="card-img d-none"
          src={`https://image.tmdb.org/t/p/w780/${ImageBackdropPath}`}
          alt={title}
        />

        <div className="card-img-overlay d-flex flex-column">
          {cardBody}
          {cardFooter}
        </div>

        {Overlay}
      </div>
    </StyledCard>
  );
};

export default Card;

const UpdateSpan = styled.span`
  &:hover {
    color: orange;
  }
`;

const StyledOverlay = styled.div`
  visibility: hidden;
  display: flex;
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 75%;
  align-items: end;
  cursor: pointer;
  user-select: none;
  & div {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: -1px 1px 12px rgba(255, 175, 30, 0.81);
  }
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
    cursor: pointer;
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
    /* cursor: pointer; */
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

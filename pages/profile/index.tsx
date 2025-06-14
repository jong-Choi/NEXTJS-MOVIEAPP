import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import CardGrid from "../../components/board/card/CardGrid";
import CardRow from "../../components/CardRow";
import MovieRow from "../../components/MovieRow";
import MyMovieForm from "../../components/MyMovieForm";
import ProfileLink from "../../components/ProfileLink";
import { StyledSearchResults } from "../../components/SearchResult";
import { authService } from "../../public/fbase";
import { fetchAticles } from "../../services/fbDb";
import { updateProfile } from "../../services/fbProfile";
import { newRecommendations } from "../../services/tmdbApi";
import wrapper, { useTypedSelector } from "../../store";
import {
  patchUserProfile,
  setUserOjbect,
  setUserProfile,
} from "../../store/authSlice";
import { setArticles as setStoreArticles } from "../../store/dbSlice";
import StyledForm from "../../styles/StyledForm";
import { StyledMovieRow } from "../../styles/StyledMovieRow";
import { Movie } from "../../types/moive";
import { ProfileType } from "../../types/profile";
import { toastError, toastInfo, toastSuccess } from "../../utils/toastAlert";

const MyProfile = () => {
  const profile = useTypedSelector((state) => state.authSlice.userProfile);
  const router = useRouter();
  const dispatch = useDispatch();
  const [articles, setArticlesState] = useState([]);
  const storeArticles = useTypedSelector((state) => {
    return state.dbSlice.articles;
  }, shallowEqual);

  useEffect(() => {
    if (!storeArticles?.length) {
      fetchAticles(0, profile.uid).then((articles) => {
        dispatch(setStoreArticles(articles));
        setArticles(articles);
      });
    } else {
      setArticles(storeArticles);
    }
  }, []);

  const setArticles = (articles) => {
    setArticlesState(articles);
    dispatch(setStoreArticles(articles));
  };

  const [myMovies, setMyMovies] = useState(
    JSON.parse(JSON.stringify(profile.myMovies)),
  );

  const onSearchResultClikced = useCallback(
    (movie: Movie) => {
      if (myMovies.find((element) => element.id === movie.id)) return;
      if (myMovies.length >= 5) {
        return toastInfo("다섯개까지 선택 가능합니다.");
      }
      setMyMovies([
        ...myMovies,
        {
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          id: movie.id,
          title: movie.title || movie.original_title,
          genre_ids: movie.genre_ids,
        },
      ]);
    },
    [myMovies],
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const myRecommendations = await newRecommendations(myMovies);
    updateProfile(profile.documentId, myMovies, myRecommendations)
      .then(async (res) => {
        dispatch(
          patchUserProfile({
            myMovies: JSON.parse(JSON.stringify(myMovies)),
            myRecommendations: JSON.parse(JSON.stringify(myRecommendations)),
          }),
        );
        setIsLoading(false);
        setIsUpdating(false);
        toastSuccess("프로필이 수정되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsUpdating(false);
        toastError("프로필 수정에 실패하였습니다.");
      });
  };

  const onLogout = useCallback(() => {
    authService.signOut();
    sessionStorage.clear();
    router.push("/");
  }, []);

  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const onClickModal = (e) => {
    if (followerModal || followingModal) {
      setFollowerModal(false);
      setFollowingModal(false);
    }
  };
  return (
    <StyledProfile onClick={onClickModal}>
      <div
        className="page-content page-container mt-5 mb-3 up-comming"
        id="page-content"
      >
        <div className="padding">
          <div className="row container d-flex justify-content-center mx-auto">
            <div className="col-lg-5 col-md-7">
              <div className="card">
                <div className="card-body text-center">
                  <div>
                    <h4>{profile.nickname}</h4>
                    <img
                      src={profile.image}
                      style={{ width: "120px" }}
                      className="m-3"
                    />
                    <p>
                      <button
                        type="button"
                        className={`btn btn-dark
                        `}
                        onClick={onLogout}
                      >
                        로그아웃 하기
                      </button>
                    </p>
                  </div>

                  <div className="border-top pt-3">
                    <div className="row">
                      <div className="col-4">
                        <h6
                          className={`${
                            articles.length ? "up-comming" : "invisible"
                          }`}
                        >
                          {articles.length}
                        </h6>
                        <p>Post</p>
                      </div>
                      <div
                        role="button"
                        className="col-4"
                        onClick={() => {
                          setFollowerModal(true);
                        }}
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal"
                      >
                        <h6>{profile.followers?.length}</h6>
                        <p>Followers</p>
                      </div>

                      <div
                        className={`RowContainer modalList ${
                          followerModal ? "" : "d-none"
                        }`}
                      >
                        <div className="m-2">나의 팔로워</div>
                        {profile.followers?.map((follower) => {
                          return (
                            <ProfileLink uid={follower.uid} myUid={profile.uid}>
                              <div key={follower.uid + "following"}>
                                <img
                                  src={follower.image}
                                  style={{ height: "64px" }}
                                />
                                <span>{follower.nickname}</span>
                                <hr />
                              </div>
                            </ProfileLink>
                          );
                        })}
                      </div>

                      {/* <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title text-white"
                                id="exampleModalLabel"
                              >
                                나의 팔로워
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body text-white">
                              {profile.followers?.map((follower) => {
                                return (
                                  <div
                                    key={follower.uid + "follower"}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <Link
                                      className="text-white"
                                      key={follower.uid}
                                      href={`/profile/${follower.uid}`}
                                      // as={`/profile`}
                                    >
                                      <img
                                        src={follower.image}
                                        style={{ height: "64px" }}
                                      />
                                      <span>{follower.nickname}</span>
                                    </Link>
                                    <hr />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div
                        role="button"
                        onClick={() => {
                          setFollowingModal(true);
                        }}
                        className="col-4"
                        // data-bs-toggle="modal"
                        // data-bs-target="#followingModal"
                      >
                        <h6>{profile.followings?.length}</h6>
                        <p>Followings</p>
                      </div>

                      <div
                        className={`RowContainer modalList ${
                          followingModal ? "" : "d-none"
                        }`}
                      >
                        <div className="m-2">나의 팔로잉</div>
                        {profile.followings?.map((follwing) => {
                          return (
                            <ProfileLink uid={follwing.uid} myUid={profile.uid}>
                              <div key={follwing.uid + "following"}>
                                <img
                                  src={follwing.image}
                                  style={{ height: "64px" }}
                                />
                                <span>{follwing.nickname}</span>
                                <hr />
                              </div>
                            </ProfileLink>
                          );
                        })}
                      </div>
                      {/* <div
                        className="modal fade"
                        id="followingModal"
                        tabIndex={-1}
                        aria-labelledby="followingModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title text-white"
                                id="followingModalLabel"
                              >
                                나의 팔로잉
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body text-white">
                              {profile.followings?.map((follwing) => {
                                return (
                                  <div
                                    key={follwing.uid + "following"}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <Link
                                      className="text-white"
                                      key={follwing.uid}
                                      href={`/profile/${follwing.uid}`}
                                      // as={`/profile`}
                                    >
                                      <img
                                        src={follwing.image}
                                        style={{ height: "64px" }}
                                      />
                                      <span>{follwing.nickname}</span>
                                    </Link>
                                    <hr />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center up-comming">
        <div className="col-12 col-lg-10">
          <div className="row">
            <div className="d-flex align-items-center">
              <h4 className="m-3 mr-0">나의 인생영화</h4>
              <div
                className="updatingButton mt-1"
                role="button"
                onClick={() => {
                  if (isUpdating) {
                    setMyMovies(JSON.parse(JSON.stringify(profile.myMovies)));
                  }
                  setIsUpdating(!isUpdating);
                }}
              >
                {!isUpdating ? "수정하기" : "취소"}
              </div>
            </div>

            {!isUpdating ? (
              <div>
                <MovieRow
                  id={profile.uid + "myMovies"}
                  moviesData={profile.myMovies}
                />
              </div>
            ) : (
              <StyledForm>
                <div
                  className="login-dark mt-5 mb-3"
                  style={{ height: "204px" }}
                >
                  <form>
                    <MyMovieForm
                      myMovies={myMovies}
                      setMyMovies={setMyMovies}
                      onResultClick={onSearchResultClikced}
                    ></MyMovieForm>
                    <div className="form-floating text-center">
                      <button
                        className={`btn btn-primary btn-block ${
                          myMovies.length < 5 || isLoading ? "disabled" : ""
                        }`}
                        type="button"
                        onClick={onRequest}
                      >
                        {!isLoading ? "완료하기" : "로딩중"}
                      </button>
                    </div>
                  </form>
                </div>
              </StyledForm>
            )}
          </div>
          <div className={`row ${isUpdating ? "d-none" : ""}`}>
            <h4 className="m-3">나를 위한 추천 영화</h4>
            <div>
              <MovieRow
                id={profile.uid + "recommendations"}
                moviesData={profile.myRecommendations}
              />
            </div>
          </div>
          <div
            className={`row mb-3 ${isUpdating ? "d-none" : ""} ${
              articles.length ? "up-comming" : "invisible"
            }`}
          >
            <h4 className="m-3">내가 작성한 글</h4>
            {articles.length ? (
              <CardRow articles={articles} setArticles={setArticles}></CardRow>
            ) : (
              <div className="col-12 text-center">작성한 글이 없습니다.</div>
            )}
          </div>
          <div
            className={`row ${!isUpdating ? "d-none" : ""}`}
            style={{ padding: "350px" }}
          ></div>
        </div>
      </div>
      {/* <CardGrid
        creating={creating}
        setCreating={setCreating}
        initialArticles={posts}
      ></CardGrid> */}
    </StyledProfile>
  );
};

export default MyProfile;

export const StyledProfile = styled.div`
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  .modalList {
    height: 350px;
    width: 400px;
    position: absolute;
    /* overflow-y: scroll; */
    top: 0;
    background-color: rgba(0, 0, 0, 0.87);
  }
  .stretch-card > .card {
    width: 100%;
    min-width: 100%;
  }
  .updatingButton {
    font-size: small;
  }
  .updatingButton:hover {
    color: orange;
  }
  .card {
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.397);
    background-clip: border-box;
    border: 1px solid rgba(20, 20, 20, 0.438);
    border-radius: 10px;
  }

  .btn-info {
    color: #fff;
    background-color: #f48f3d;
    border-color: #f48f3d;
  }

  .btn {
    font-size: 0.875rem;
    line-height: 1;
    font-weight: 400;
    padding: 0.7rem 1.5rem;
    border-radius: 0.1275rem;
  }

  h6 {
    font-size: 0.9375rem;
  }
`;

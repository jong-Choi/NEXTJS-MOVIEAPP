import Link from "next/link";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import styled from "styled-components";
import CardGrid from "../../components/board/card/CardGrid";
import CardRow from "../../components/CardRow";
import MovieRow from "../../components/MovieRow";
import { fetchAticles } from "../../services/fbDb";
import { fetchProfile } from "../../services/fbProfile";
import wrapper, { useTypedSelector } from "../../store";
import { setUserOjbect } from "../../store/authSlice";
import { StyledMovieRow } from "../../styles/StyledMovieRow";

// {
//   uid: "",
//   nickname: "",
//   image: "",
//   myMovies: [],
//   myRecommendations: [],
// } as ProfileDataType,
// }

const ProfilePage = ({ profile }) => {
  const myUid = useTypedSelector((state) => {
    return state.authSlice.userProfile.uid;
  }, shallowEqual);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchAticles(0, profile.uid).then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <StyledProfile>
      <div className="page-content page-container mt-5 mb-3" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center mx-auto">
            <div className="col-lg-5 col-md-7">
              <div className="card">
                <div className="card-body text-center">
                  <div>
                    <h4>{profile.nickname}</h4>
                    <img
                      src={profile.image}
                      style={{ maxWidth: "240px" }}
                      className="m-3"
                    />
                    <p>
                      <button
                        v-if="isAuthorized && isAuthor"
                        type="button"
                        className={`btn btn-dark
                        `}
                        onClick={() => {}}
                      >
                        로그아웃 하기
                      </button>
                    </p>
                  </div>

                  <div className="border-top pt-3">
                    <div className="row">
                      <div className="col-4">
                        <h6>{articles.length}</h6>
                        <p>Post</p>
                      </div>
                      <div
                        className="col-4"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <h6>{profile.followers.length}</h6>
                        <p>Followers</p>
                      </div>

                      <div
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
                                className="modal-title text-dark"
                                id="exampleModalLabel"
                              >
                                {profile.nickname}님의 팔로워
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body text-dark">
                              {profile.followers.map((follower) => {
                                console.log(follower);
                                return (
                                  <div
                                    key={follower.uid + "follower"}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <Link
                                      className="text-dark"
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
                      </div>
                      <div
                        className="col-4"
                        data-bs-toggle="modal"
                        data-bs-target="#followingModal"
                      >
                        <h6>{profile.followings.length}</h6>
                        <p>Followings</p>
                      </div>

                      <div
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
                                className="modal-title text-dark"
                                id="followingModalLabel"
                              >
                                {profile.nickname}님의 팔로잉
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body text-dark">
                              {profile.followings.map((follwing) => {
                                return (
                                  <div key={follwing.uid + "following"}>
                                    <Link
                                      className="text-dark"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row">
            <h4 className="m-3">{profile.nickname}님의 인생영화</h4>
            <div>
              <MovieRow
                id={profile.uid + "myMovies"}
                moviesData={profile.myMovies}
              />
            </div>
          </div>
          <div className="row">
            <h4 className="m-3">{profile.nickname}님과 함께 보면 좋을 영화</h4>
            <div>
              <MovieRow
                id={profile.uid + "recommendations"}
                moviesData={profile.myRecommendations}
              />
            </div>
          </div>
          <div className={`row mb-5`}>
            <h4 className="m-3">{profile.nickname}님이 작성한 글</h4>
            {articles.length ? (
              <CardRow articles={articles} setArticles={setArticles}></CardRow>
            ) : (
              <div className="col-12 text-center">작성한 글이 없습니다.</div>
            )}
          </div>
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

export default ProfilePage;

export async function getServerSideProps(context) {
  const { uid } = context.query; // get the URL parameter
  const profile = await fetchProfile(uid);

  return {
    props: {
      profile,
    },
  };
}

const StyledProfile = styled.div`
  .stretch-card > .card {
    width: 100%;
    min-width: 100%;
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

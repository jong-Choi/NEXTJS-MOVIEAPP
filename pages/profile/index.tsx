import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchProfile } from "../../services/fbProfile";
import wrapper, { useTypedSelector } from "../../store";
import { ProfileDataType } from "../../types/profile";

const ProfilePage = () => {
  const {
    image: myImage,
    uid: myUid,
    nickname: myNickname,
  } = useTypedSelector((state) => state.authSlice.userProfile);
  const profile = JSON.parse(
    `{"documentId":"rKWT1UNoZNTAEWkVT9ov","image":"/profileImages/6.jpg","myMovies":[{"backdrop_path":"/pbEkjhdfP7yuDcMB78YEZwgD4IN.jpg","genre_ids":[18,28,80,53],"title":"다크 나이트","id":155},{"genre_ids":[53,27],"title":"맨 인 더 다크 2","backdrop_path":"/zHeJ1H3PiOFxmWgEBsp2jA3qetK.jpg","id":482373},{"genre_ids":[28,12,14],"title":"토르: 다크 월드","id":76338,"backdrop_path":"/4zTsF0RtO0av3YX1NaKDqGKPxYF.jpg"},{"backdrop_path":"/Yrpb32j3eMpMVX7ND3TnOkHnbl.jpg","title":"다크 나이트 라이즈","genre_ids":[28,80,18,53],"id":49026},{"title":"터미네이터: 다크 페이트","genre_ids":[878,28],"id":290859,"backdrop_path":"/a6cDxdwaQIFjSkXf7uskg78ZyTq.jpg"}],"nickname":"안녕하세요","uid":"8wSwmYnqiLfZulcRmg4o2MVifRG2","myRecommendations":[{"genre_ids":[12,14,28],"title":"반지의 제왕: 두 개의 탑","backdrop_path":"/kWYfW2Re0rUDE6IHhy4CRuKWeFr.jpg","id":121},{"genre_ids":[12,28,878],"id":10138,"title":"아이언맨 2","backdrop_path":"/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg"},{"backdrop_path":"/tKa1gmGKAUVYnflYcadipeL3d9h.jpg","genre_ids":[28,12,878],"title":"아이언맨 3","id":68721},{"backdrop_path":"/q2VYkSfxokWVlKX5UrWMCptBFSj.jpg","genre_ids":[27],"title":"블링크: 침묵의 시간","id":294308},{"genre_ids":[28,878,53],"title":"터미네이터 4: 미래전쟁의 시작","backdrop_path":"/5tKiuZvvV1lic7v65rdoGPmoOvf.jpg","id":534},{"backdrop_path":"/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg","genre_ids":[28,878,12],"title":"인셉션","id":27205},{"backdrop_path":"/a7sAqMKv5tkAdMzFfIhPqIBmQ9g.jpg","title":"앤트맨","genre_ids":[878,28,12],"id":102899},{"id":43253,"genre_ids":[37],"backdrop_path":"/lheyqPFMDF4nQeaLquPBOhfjSPu.jpg","title":"톨 T"},{"genre_ids":[28,12,14],"backdrop_path":"/sLWUtbrpiLp23a0XDSiUiltdFPJ.jpg","id":1930,"title":"어메이징 스파이더맨"},{"id":132313,"title":"Ivan the Incredible","genre_ids":[16,35,10751],"backdrop_path":"/cDRXnHcVzRFUtsBk7f1RDXJOLtg.jpg"},{"genre_ids":[878],"id":81859,"title":"티포스","backdrop_path":"/s6PGQuujbrIKWi44agb8eTVNUqw.jpg"},{"genre_ids":[10751,14,10402,10749],"backdrop_path":"/z2Cq8jxiEtmmjVrKbQXgrZzw26j.jpg","title":"T 박사의 피아노 레슨","id":33743},{"id":100402,"genre_ids":[28,12,878],"backdrop_path":"/yHB0eNR8rvCpn0VdghEwBsXAC0N.jpg","title":"캡틴 아메리카: 윈터 솔져"},{"id":120,"backdrop_path":"/tdmlSbLl84hfHx635AqHLB8Qh8M.jpg","title":"반지의 제왕: 반지 원정대","genre_ids":[12,14,28]},{"title":"캡틴 아메리카: 시빌 워","genre_ids":[12,28,878],"id":271110,"backdrop_path":"/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg"},{"genre_ids":[28,12,878],"backdrop_path":"/69EFgWWPFWbRNHmQgYdSnyJ94Ge.jpg","id":49521,"title":"맨 오브 스틸"},{"title":"Perpetual Planet: Heroes of the Oceans","backdrop_path":"/1cXP04QLtG86gMWna5SZxHfbYI8.jpg","id":814196,"genre_ids":[99]},{"title":"좀비랜드: 더블 탭","id":338967,"backdrop_path":"/e7tMI0zVKJB2TS74TaBifIZIkCp.jpg","genre_ids":[35,27]},{"title":"토르: 천둥의 신","id":10195,"genre_ids":[12,14,28],"backdrop_path":"/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg"},{"id":522938,"title":"람보: 라스트 워","genre_ids":[28,53,18],"backdrop_path":"/pAsZ0ifQwKTHVab8bCHHn2qtizE.jpg"}]}`,
  );
  const [isFollowed, setIsFollowed] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    setIsFollowed(profile.followers?.include(myUid));
  }, [profile]);

  return (
    <StyledProfile>
      <div className="page-content page-container mt-5 mb-3" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-body text-center">
                  <div>
                    <img src={profile.image} style={{ maxWidth: "320px" }} />
                    <h4>{profile.nickname}</h4>
                    <p>
                      <button
                        v-if="isAuthorized && isAuthor"
                        type="button"
                        className="btn btn-dark"
                        onClick={() => {}}
                      >
                        로그아웃 하기
                      </button>
                    </p>
                    {/* <p>
                  <router-link
                    v-if="isAuthorized && isAuthor"
                    :to="{ name: 'ProfileEditPage', params: { userId } }"
                    >프로필 수정하기</router-link
                  >
                </p> */}
                    {/* <p className="text-muted mb-0">
                  {{ profile.nickname || profile.user.username }}님의
                  공간
                </p> */}
                  </div>

                  <button
                    v-if="isAuthorized && !isAuthor"
                    onClick={() => {}}
                    className="btn btn-info btn-sm mt-3 mb-4"
                  >
                    {isFollowed ? "팔로우 취소 하기" : "팔로우 하기"}
                  </button>

                  <div className="border-top pt-3">
                    <div className="row">
                      <div className="col-4">
                        <h6>{myPosts.length}</h6>
                        <p>Post</p>
                      </div>
                      <div
                        className="col-4"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <h6>{profile.followers?.length}</h6>
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
                              {profile.followers?.map((follower) => {
                                return (
                                  <div
                                    key={follower.uid}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <Link
                                      href={{
                                        pathname: "/about",
                                        query: { name: "test" },
                                      }}
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
                        <h6>{profile.followings?.length}</h6>
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
                              {profile.followings?.map((follwing) => {
                                return (
                                  <div
                                    key={follwing.uid}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <Link
                                      href={{
                                        pathname: "/about",
                                        query: { name: "test" },
                                      }}
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
          {/* <div>
      <row-list :RowTitle="rowTitle" :movieList="myRecommendations()" />

      <post-my-list-page :userId="userId" />
    </div> */}
        </div>
      </div>
    </StyledProfile>
  );
};

export default ProfilePage;

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

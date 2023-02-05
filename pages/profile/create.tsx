import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Search from "../../components/Search";
import { authService, dbService } from "../../public/fbase";
import { createProfile, fetchProfile } from "../../services/fbProfile";
import wrapper, { useTypedSelector } from "../../store";
import { setUserOjbect, setUserProfile } from "../../store/authSlice";
import StyledForm from "../../styles/StyledForm";
import { ProfileType } from "../../types/profile";
import { setCookie } from "../../utils/handleCookie";

const create = () => {
  const userObject = useTypedSelector((store) => store.authSlice.userObject);
  const router = useRouter();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("/profileImages/1.jpg");
  const [movie, setMovie] = useState("");
  const [myMovies, setMyMovies] = useState([]);
  const [changinProfile, setChangingProfile] = useState(false);
  const [integrityMsg, setIntegrityMsg] = useState("모든 항목을 작성해주세요");
  const onRequest = () => {
    createProfile({ uid: userObject?.uid, nickname, image, myMovies })
      .then(async (res) => {
        const documentId = res.id;
        const profileData = await res.get().then((res) => {
          return res.data() as ProfileType;
        });
        await setUserProfile({ ...profileData, documentId });
        router.push("/main");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const onMounted = async () => {
      if (!userObject) {
        const currentUser = authService.currentUser;
        if (!currentUser) return;
        // if (!currentUser) return router.push("/");
        dispatch(setUserOjbect(currentUser));
        setCookie("uid", currentUser.uid, 1);
      }
      const userProfile = await fetchProfile(userObject.uid);
      if (userProfile) {
        return router.push("/");
      }
    };
    onMounted();
  }, []);

  return (
    <>
      <StyledForm>
        <div className="login-dark">
          <form method="post">
            <h2 className="sr-only text-center title">환영합니다</h2>
            <h2 className="sr-only text-center title-delayed">
              프로필을 작성해주세요
            </h2>
            <div className="text-center">
              <div className="form-floating pointer">
                <img src={image} className="profile-image mt-2" />
                <div
                  className={`d-flex align-items-center d-flex justify-content-center small-image-container ${
                    changinProfile ? "" : "d-none"
                  }`}
                  onClick={(e: any) => {
                    if (e.target.src)
                      setImage(
                        `/profileImages/${
                          e.target.src.split("/").slice(-1)[0]
                        }`,
                      );
                  }}
                >
                  <img src="/profileImages/1.jpg" className="small-image" />
                  <img src="/profileImages/2.jpg" className="small-image" />
                  <img src="/profileImages/3.jpg" className="small-image" />
                  <img src="/profileImages/4.jpg" className="small-image" />
                  <img src="/profileImages/5.jpg" className="small-image" />
                  <img src="/profileImages/6.jpg" className="small-image" />
                  <img src="/profileImages/7.jpg" className="small-image" />
                  <img src="/profileImages/8.jpg" className="small-image" />
                  <img src="/profileImages/9.jpg" className="small-image" />
                  <img src="/profileImages/10.jpg" className="small-image" />
                  <img src="/profileImages/11.jpg" className="small-image" />
                </div>
                <div
                  className="text-light"
                  onClick={() => {
                    setChangingProfile(!changinProfile);
                  }}
                >
                  {changinProfile
                    ? "사진 변경 완료하기"
                    : "프로필 사진 변경하기"}
                </div>
              </div>
            </div>
            <div className="form-floating">
              <input
                className="form-control text-center"
                type="text"
                name="text"
                placeholder="닉네임을 입력하세요"
              />
              <label htmlFor="floatingInput">닉네임을 입력하세요</label>
            </div>
            <Search></Search>
            <div className="form-floating">
              <input
                className="form-control text-center"
                type="text"
                name="text"
                placeholder="나의 인생영화"
                disabled
              />
              <label htmlFor="floatingInput">나의 인생영화</label>
            </div>
            <div className="d-flex justify-content-evenly small-text-container">
              {myMovies.map((element, idx) => {
                return (
                  <div
                    className="text-light pointer text-truncate small-text"
                    key={idx.toString + Math.random().toFixed(20)}
                    onClick={async (e) => {
                      myMovies.splice(myMovies.indexOf(element), 1);
                      setMyMovies([...myMovies]);
                    }}
                  >
                    {element}번 영화 삭제하기
                  </div>
                );
              })}
            </div>
            <div className="form-floating text-center">
              <button
                className={`btn btn-primary btn-block ${
                  integrityMsg ? "disabled" : ""
                }`}
                type="submit"
              >
                작성 완료하기
              </button>
              <div className="forgot mt-2">{integrityMsg}</div>
            </div>
          </form>
        </div>
      </StyledForm>
    </>
  );
};

export default create;

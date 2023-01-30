import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authService, dbService } from "../../public/fbase";
import { createProfile, fetchProfile } from "../../services/fbProfile";
import wrapper, { useTypedSelector } from "../../store";
import { setUserOjbect, setUserProfile } from "../../store/authSlice";
import { ProfileType } from "../../types/profile";
import { setCookie } from "../../utils/handleCookie";

const create = () => {
  const userObject = useTypedSelector((store) => store.authSlice.userObject);
  const router = useRouter();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("/default.png");
  const [movie, setMovie] = useState("");
  const [myMovies, setMyMovies] = useState([]);
  const [changinProfile, setChangingProfile] = useState(false);
  const [integrityMsg, setIntegrityMsg] = useState("모든 항목을 작성해주세요");
  const onRequest = () => {
    createProfile({ uid: userObject.uid, nickname, image, myMovies })
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
        if (!currentUser) return router.push("/login");
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
      <div>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="nickname"
        ></input>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled
        ></input>
        <input
          type="number"
          id="movie"
          name="movie"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="movie"
        ></input>
        <button
          type="button"
          onClick={(e) => {
            if (myMovies.length < 5) setMyMovies([...myMovies, movie]);
          }}
        >
          {" "}
          영화 추가하기
        </button>
        {myMovies.map((element, idx) => {
          return (
            <button
              type="button"
              key={idx.toString + Math.random().toFixed(20)}
              onClick={async (e) => {
                myMovies.splice(myMovies.indexOf(element), 1);
                setMyMovies([...myMovies]);
              }}
            >
              {element}번 영화 삭제하기
            </button>
          );
        })}
        <br />
        <button type="button" onClick={onRequest}>
          프로필 작성 완료하기
        </button>
      </div>
      <StyledForm>
        <div className="login-dark">
          <form method="post">
            <h2 className="sr-only text-center">프로필을 작성하세요</h2>
            <div className="text-center">
              <div className="form-floating pointer">
                <img src="/default.png" className="profile-image mt-2" />
                <div
                  className={`d-flex align-items-center d-flex justify-content-center small-image-container ${
                    changinProfile ? "" : "d-none"
                  }`}
                >
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
                  <img src="/default.png" className="small-image" />
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
            <div className="form-floating">
              <input
                className="form-control text-center"
                type="text"
                name="text"
                placeholder="닉네임을 입력하세요"
              />
              <label htmlFor="floatingInput">인생 영화를 검색하세요</label>
            </div>
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

const StyledForm = styled.div`
  label {
    transition: 0.1s;
  }
  .pointer {
    cursor: pointer;
  }
  .small-text-container {
    height: 20px;
  }
  .small-image-container {
    height: 60px;
    transition: 0.2s;
    animation-duration: 0.1s;
    animation-name: slidein;
  }
  @keyframes slidein {
    from {
      height: 0px;
    }
    to {
      height: 60px;
    }
  }
  .small-text {
    font-size: 12px;
  }
  .small-image {
    max-height: 40px;
    cursor: pointer;
    transition: 0.2s;
    animation-duration: 0.1s;
    animation-name: slidein-image;
  }
  @keyframes slidein-image {
    from {
      height: 0px;
    }
    to {
      height: 40px;
    }
  }
  .small-image:hover {
    max-height: 60px;
  }
  .profile-image {
    max-height: 100px;
  }
  .login-dark {
    height: 1000px;
    position: relative;
    animation: up-comming 1000ms;
    animation-fill-mode: forwards;
  }
  @keyframes up-comming {
    0% {
      opacity: 0;
      transform: translate3d(0, 105%, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  .login-dark form {
    max-width: 710px;
    width: 90%;
    background-color: #1e2833;
    padding: 40px;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  }

  .login-dark .illustration {
    text-align: center;
    padding: 15px 0 20px;
    font-size: 100px;
    color: #2980ef;
  }

  .login-dark form .form-control {
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }

  .login-dark form .btn-primary {
    background: #214a80;
    border: none;
    border-radius: 4px;
    padding: 11px;
    box-shadow: none;
    margin-top: 26px;
    text-shadow: none;
    outline: none;
  }

  .login-dark form .btn-primary:hover,
  .login-dark form .btn-primary:active {
    background: #2e62a6;
    outline: none;
  }

  .login-dark form .disabled {
    opacity: 0.2;
  }

  .login-dark form .forgot {
    display: block;
    text-align: center;
    font-size: 12px;
    min-height: 20px;
    color: #b8a090;
    opacity: 1;
    text-decoration: none;
  }

  .login-dark form .btn-primary:active {
    transform: translateY(1px);
  }
`;

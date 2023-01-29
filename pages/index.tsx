import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authService } from "../public/fbase";
import { onSocialLogin } from "../services/fbAuth";
import { fetchProfile } from "../services/fbProfile";
import wrapper from "../store";
import authSlice from "../store/authSlice";
import GrayScaleMasthead from "../styles/GrayScaleMasthead";
import { setCookie } from "../utils/handleCookie";

export default function Home() {
  const [imgUrl, setImgUrl] = useState("");
  const [quetes, setQuetes] = useState("");
  const [movieName, setMovieName] = useState("");
  const [headClassName, setHeadClassName] = useState("");
  const [buttonDisplay, setButtonDisplay] = useState("d-none");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const backdropPathList = [
      "/backgroundImages/대부.jpg",
      "/backgroundImages/쇼생크탈출.jpg",
      "/backgroundImages/다크나이트.jpg",
      "/backgroundImages/어바웃타임.jpg",
      "/backgroundImages/비포선라이즈.jpg",
      "/backgroundImages/중경삼림.jpg",
      "/backgroundImages/그래비티.jpg",
      "/backgroundImages/이터널선샤인.jpg",
    ];
    const movieTitleList = [
      "대부",
      "쇼생크 탈출",
      "다크 나이트",
      "어바웃 타임",
      "비포 선라이즈",
      "중경삼림",
      "그래비티",
      "이터널 선샤인",
    ];
    const movieQuotes = [
      "친구는 가까이 두어라, 그러나 적은 더욱 가까이 두어라.",
      "두려움은 너를 죄수로 가두지만, 희망은 너를 자유롭게 만든다",
      "우리가 넘어지는 건, 다시 일어서는 법을 배우기 위해서란다.",
      "우리는 누구나 일상 속에서 시간여행을 하고 있다.",
      "누군가를 사랑하고, 또 사랑받는다는 건 나에게 큰 의미야",
      "사랑에 유통기한이 있다면,  나는 만년으로 하고 싶다.",
      "어쨌든 일생일대의 비행이 될거야. 난 준비됐어.",
      "이 기억만큼은 지우지 말아주세요.",
    ];

    const randIdx = Math.ceil(Math.random() * (movieTitleList.length - 1));
    setImgUrl(backdropPathList[randIdx]);
    setMovieName(movieTitleList[randIdx]);
    setQuetes(movieQuotes[randIdx]);
    authService.onAuthStateChanged(async (user) => {
      const currentUser = authService.currentUser;
      await dispatch(authSlice.actions.setUserOjbect(currentUser));
      if (!currentUser) {
        setButtonDisplay("");
        return;
      }
      const uid = currentUser.uid;
      setCookie("uid", uid, 1);
      setButtonDisplay("d-none");
      let url = "/main";
      const profile = await fetchProfile(uid);
      if (!profile) url = "/profile/create";
      setTimeout(() => {
        setHeadClassName("up-lift");
        setTimeout(() => router.push(url), 1100);
      }, 1000);
      dispatch(authSlice.actions.setUserProfile(profile));
    });
  }, []);

  return (
    <GrayScaleMasthead>
      <BgImg src={imgUrl} className={`after-1-secs ${headClassName}`}></BgImg>
      <header className={`masthead ${headClassName} after-0-secs`}>
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center masthead-text">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1 className="mx-auto my-0 text-uppercase">TEAL AND ORAGNE</h1>
              <h2 className="text-white-50 mx-auto mt-3 mb-5">
                {quetes}
                <br />- <i> {movieName}</i>
              </h2>
              <button
                type="button"
                className={`btn btn-outline-light after-1-secs ${buttonDisplay}`}
                onClick={onSocialLogin}
                name="loginWithGoogle"
              >
                구글로 로그인 하기
              </button>
            </div>
          </div>
        </div>
      </header>
    </GrayScaleMasthead>
  );
}

const BgImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100vw;
  max-height: 99vh;
  object-fit: cover;
  visibility: hidden;
  animation: fadein 1s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`;

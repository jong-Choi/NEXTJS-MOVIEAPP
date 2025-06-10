import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authService } from "../public/fbase";
import { onGuestLogin, onSocialLogin } from "../services/fbAuth";
import { fetchAticles, fetchTrending } from "../services/fbDb";
import { fetchProfile } from "../services/fbProfile";
import authSlice from "../store/authSlice";
import { setArticles, setTrendingArticles } from "../store/dbSlice";
import GrayScaleMasthead from "../styles/GrayScaleMasthead";
import { setCookie } from "../utils/handleCookie";
import { toastError } from "../utils/toastAlert";

export default function Home() {
  const [imgUrl, setImgUrl] = useState("");
  const [quetes, setQuetes] = useState("");
  const [movieName, setMovieName] = useState("");
  const [headClassName, setHeadClassName] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
      let flag = 1;
      let routingTimeoutId;
      const routing = () => {
        if (!flag) {
          setHeadClassName("up-lift");
          setTimeout(() => router.push(url), 510);
        } else if (flag > 100) {
          clearTimeout(routingTimeoutId);
          toastError("알 수 없는 에러가 발생하였습니다.");
        } else {
          flag += 1;
          routingTimeoutId = setTimeout(routing, 200);
        }
      };
      setTimeout(() => {
        routing();
      }, 1000);

      Promise.allSettled([
        dispatch(authSlice.actions.setUserOjbect(currentUser)),
        dispatch(authSlice.actions.setUserProfile(profile)),
        fetch("/preloadingData.json").then(async (data) => {
          const res = await data.json();
          res.preloadData.map((backdrop_path) => {
            const imageElement = new Image();
            imageElement.src = `https://image.tmdb.org/t/p/w300/${backdrop_path}`;
            return imageElement;
          });
        }),
        () => {
          if (!profile) return;
          profile.myRecommendations.map((movie) => {
            const imageElement = new Image();
            imageElement.src = `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`;
            return imageElement;
          });
          const imageElement = new Image();
          imageElement.src = `/${profile.image}`;
        },
        fetchTrending().then((res) => {
          dispatch(setTrendingArticles(res));
        }),
        profile &&
          fetchAticles(0, profile.uid).then((articles) => {
            dispatch(setArticles(articles));
          }),
      ]).then(() => (flag = -1));
    });
  }, []);

  return (
    <GrayScaleMasthead>
      <BgImg
        src={imgUrl}
        className={`mast_hidden ${
          isImageLoaded ? "after-01-secs" : ""
        } ${headClassName}`}
        onLoad={() => setIsImageLoaded(true)}
      ></BgImg>
      <header className={`masthead ${headClassName} after-0-secs`}>
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center masthead-text">
          <div className="d-flex justify-content-center">
            <div
              className={`text-center mast_hidden ${
                isImageLoaded ? "after-01-secs" : ""
              }`}
            >
              <h1 className="mx-auto my-0 text-uppercase">TEAL AND ORANGE</h1>
              <h2 className="text-white-50 mx-auto mt-3 mb-5">
                {quetes}
                <br />- <i> {movieName}</i>
              </h2>
              <div className="d-flex flex-column gap-2 w-50 mx-auto">
                <button
                  type="button"
                  className={`btn btn-light ${buttonDisplay}`}
                  onClick={onSocialLogin}
                  name="loginWithGoogle"
                >
                  구글로 로그인 하기
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-light ${buttonDisplay}`}
                  onClick={onGuestLogin}
                  name="loginWithGoogle"
                >
                  게스트 모드로 진행하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </GrayScaleMasthead>
  );
}

export const BgImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100vw;
  max-height: 99vh;
  object-fit: cover;
`;

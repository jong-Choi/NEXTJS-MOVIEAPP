import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ImageInput from "../../components/profile-form/ImageInput";
import Input from "../../components/common/Input";
import Search from "../../components/Search";
import { authService, dbService } from "../../public/fbase";
import { createProfile, fetchProfile } from "../../services/fbProfile";
import wrapper, { useTypedSelector } from "../../store";
import { setUserOjbect, setUserProfile } from "../../store/authSlice";
import StyledForm from "../../styles/StyledForm";
import { ProfileType } from "../../types/profile";
import { setCookie } from "../../utils/handleCookie";
import { toastError, toastInfo, toastSuccess } from "../../utils/toastAlert";
import { Movie, MyMovie } from "../../types/moive";
import { getRecommenations, newRecommendations } from "../../services/tmdbApi";

const ProfileCreate = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userObject = useTypedSelector((store) => store.authSlice.userObject);
  const [image, setImage] = useState("/profileImages/1.jpg");
  const [nickname, setNickname] = useState("");
  const [myMovies, setMyMovies] = useState<Array<MyMovie>>([]);

  const onSearchResultClikced = useCallback(
    (movie: Movie) => {
      if (myMovies.find((element) => element.id === movie.id)) return;
      if (myMovies.length >= 5) {
        return toastInfo("다섯개까지 선택 가능합니다.");
      }
      setMyMovies([
        ...myMovies,
        {
          backdrop_path: movie.backdrop_path,
          id: movie.id,
          title: movie.title || movie.original_title,
          genre_ids: movie.genre_ids,
        },
      ]);
    },
    [myMovies],
  );

  const [integrityMsg, setIntegrityMsg] = useState("모든 항목을 작성해주세요");

  useEffect(() => {
    if (!nickname || !myMovies.length || !image) {
      return setIntegrityMsg("모든 항목을 작성해주세요");
    }
    if ((nickname.length < 2, nickname.length > 8)) {
      return setIntegrityMsg("닉네임은 2글자 이상, 8글자 이하입니다.");
    } else if (!/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/.test(nickname)) {
      // } else if (!nickname.match(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$)/)) {
      return setIntegrityMsg("사용할 수 없는 닉네임입니다.");
    } else if (myMovies.length < 5) {
      return setIntegrityMsg("인생 영화를 5개 선택해주세요.");
    }
    setIntegrityMsg("");
  }, [nickname, myMovies, image]);

  const onRequest = async (e) => {
    e.preventDefault();
    setIntegrityMsg("잠시만 기다려 주세요");
    const myRecommendations = await newRecommendations(myMovies);

    createProfile({
      uid: userObject?.uid,
      nickname,
      image,
      myMovies,
      myRecommendations,
    })
      .then(async (res) => {
        const documentId = res.id;
        const profileData = await res.get().then((res) => {
          return res.data() as ProfileType;
        });
        setIntegrityMsg("");
        toastSuccess("프로필이 생성되었습니다.");
        router.push("/");
      })
      .catch((err) => {
        toastError("프로필 생성에 실패하였습니다.");
        setIntegrityMsg("");
      });
  };

  const onMounted = useCallback(async () => {
    if (!userObject) {
      const currentUser = authService.currentUser;
      if (!currentUser) return router.push("/");
      dispatch(setUserOjbect(currentUser));
      setCookie("uid", currentUser.uid, 1);
    }
  }, []);

  useEffect(() => {
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
            <ImageInput image={image} setImage={setImage} />
            <Input
              name="nickname"
              placeholder="닉네임을 입력하세요"
              state={nickname}
              setState={setNickname}
            />
            <Input name="myMovies" placeholder="나의 인생영화" disabled={true}>
              {!myMovies?.length ? (
                <div className="d-flex justify-content-center small-text-container">
                  <div className="text-light small-text">
                    선택된 영화가 없습니다.
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-evenly small-text-container">
                  {myMovies.map((element, idx) => {
                    return (
                      <div
                        className="text-light pointer small-text pl-5 text-truncate"
                        style={{ maxWidth: "10vw" }}
                        title="클릭하여 삭제하기"
                        key={element.id}
                        onClick={async (e) => {
                          myMovies.splice(myMovies.indexOf(element), 1);
                          setMyMovies([...myMovies]);
                        }}
                      >
                        {element.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </Input>
            <Search
              onResultClick={onSearchResultClikced}
              disabled={myMovies.length >= 5 ? true : false}
            />
            <div className="form-floating text-center">
              <button
                className={`btn btn-primary btn-block ${
                  integrityMsg ? "disabled" : ""
                }`}
                type="submit"
                onClick={onRequest}
              >
                작성 완료하기
              </button>
              <div className="forgot mt-2">{integrityMsg || " "}</div>
            </div>
          </form>
        </div>
      </StyledForm>
    </>
  );
};

export default ProfileCreate;

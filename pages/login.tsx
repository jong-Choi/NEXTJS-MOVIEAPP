import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authService } from "../public/fbase";
import { onLogut, onSocialLogin } from "../services/fbAuth";
import wrapper from "../store";
import authSlice, { setUserOjbect } from "../store/authSlice";
import { setCookie } from "../utils/handleCookie";

const login = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const DISPLAY_FALSE = "display-false";
  const [loginClass, setLoginClass] = useState(isLoggedIn || DISPLAY_FALSE);
  const [logoutClass, setLogoutClass] = useState(!isLoggedIn || DISPLAY_FALSE);
  const router = useRouter();

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      const currentUser = authService.currentUser;
      await dispatch(authSlice.actions.setUserOjbect(currentUser));
      if (!currentUser) {
        setLoginClass("display-false");
        return;
      }
      setCookie("uid", currentUser.uid, 1);
      setLoginClass("");
      router.push("/profile");
    });
  }, []);

  useEffect(() => {
    if (loginClass === "display-false") setLogoutClass("");
    else setLogoutClass("display-false");
  }, [loginClass]);

  return (
    <StyledContainer>
      <button onClick={onLogut} className={String(loginClass)}>
        로그아웃 하기
      </button>

      <button
        onClick={onSocialLogin}
        name="loginWithGoogle"
        className={String(logoutClass)}
      >
        구글로 로그인 하기
      </button>
    </StyledContainer>
  );
};

export default login;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const props = {
        isLoggedIn: true,
      };
      const cookie = req.headers.cookie;
      if (!cookie) {
        props.isLoggedIn = false;
        return { props };
      }

      const cookieArr = cookie.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return { key: key, value: value };
      });
      const { key: uidKey, value: uidValue } = cookieArr.find(
        (e) => e.key === "uid",
      );
      await store.dispatch(setUserOjbect({ [uidKey]: uidValue }));
      return { props };
    },
);

const StyledContainer = styled.div`
  .display-false {
    display: none;
  }
`;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebaseInstance, { authService } from "../public/fbase";
import { useSelector } from "../store";
import authSlice from "../store/authSlice";

const login = () => {
  const dispatch = useDispatch();
  const { userObject, isAuth } = useSelector((state) => state.authSlice);

  const onSocialLogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "loginWithGoogle") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      await dispatch(authSlice.actions.setUserOjbect(user?.multiFactor?.user));
    });
  }, []);

  return (
    <div>
      {isAuth ? (
        <button onClick={() => authService.signOut()}>로그아웃 하기</button>
      ) : (
        <button onClick={onSocialLogin} name="loginWithGoogle">
          구글로 로그인 하기
        </button>
      )}
    </div>
  );
};

export default login;

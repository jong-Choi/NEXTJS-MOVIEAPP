import React, { useEffect, useState } from "react";
import firebaseInstance, { authService } from "../public/fbase";

const login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    authService.onAuthStateChanged((user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  }, []);
  return (
    <div>
      {isLoggedIn ? (
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

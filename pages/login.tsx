import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebaseInstance, {
  authService,
  CustomMultiFactorUserType,
  dbService,
} from "../public/fbase";
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
      const multiFactor: CustomMultiFactorUserType = user?.multiFactor;
      await dispatch(authSlice.actions.setUserOjbect(multiFactor.user));
    });
  }, []);

  // useEffect(() => {
  //   if (!isAuth) return;

  //   const docRef = dbService
  //     .collection("cities")
  //     .where("uid", "==", userObject.uid);

  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, [isAuth]);

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

import { toastError } from "./../../utils/toastAlert";
import { toast } from "react-toastify";
import firebaseInstance, { authService } from "../../public/fbase";
import { delCookie } from "../../utils/handleCookie";

export const onSocialLogin = async (event) => {
  const {
    target: { name },
  } = event;
  let provider;
  if (name === "loginWithGoogle") {
    provider = new firebaseInstance.auth.GoogleAuthProvider();
  }
  await authService.signInWithPopup(provider).catch((err) => {
    toastError("로그인이 중단되었습니다.");
    Promise.reject(err);
  });
};

export const onLogut = async () => {
  await authService.signOut().catch();
  delCookie("uid");
};

const fbAuth = { onSocialLogin, onLogut };
export default fbAuth;

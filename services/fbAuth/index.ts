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
    toast.error("로그인이 중단되었습니다.", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    Promise.reject(err);
  });
};

export const onLogut = async () => {
  await authService.signOut().catch();
  delCookie("uid");
};

const fbAuth = { onSocialLogin, onLogut };
export default fbAuth;

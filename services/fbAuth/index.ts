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
  await authService.signInWithPopup(provider).catch((err) => console.log(err));
};

export const onLogut = async () => {
  await authService.signOut().catch();
  delCookie("uid");
};

const fbAuth = { onSocialLogin, onLogut };
export default fbAuth;

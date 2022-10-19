import { app } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type UserState = {
  uid: string | undefined;
  photoUrl: string | null | undefined;
  displayName: string | null | undefined;
};

export const userState = atom<UserState>({
  key: "userState",
  default: {
    uid: "",
    photoUrl: "",
    displayName: "",
  },
  effects_UNSTABLE: [persistAtom],
});

// googleでサインインする
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  await signInWithPopup(auth, provider).catch((err) => alert(err.message));
};

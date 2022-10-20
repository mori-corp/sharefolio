import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
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

  await signInWithPopup(auth, provider).catch((err) => alert(err.message));
};

// 認証ユーザーの状態管理
export const useAuth = (): UserState => {
  const [authUser, setUser] = useRecoilState(userState);

  useEffect(() => {
    // ログイン/ログアウトを感知
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Recoilで状態保持
        setUser({
          uid: user.uid,
          photoUrl: user.photoURL,
          displayName: user.displayName,
        });
      }
    });
  }, []);

  return authUser;
};

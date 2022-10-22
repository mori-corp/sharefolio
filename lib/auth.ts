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
  uid: string | null;
  photoUrl: string | null;
  displayName: string | null;
};

export const userState = atom<UserState>({
  key: "userState",
  default: {
    uid: null,
    photoUrl: null,
    displayName: null,
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
    // 認証を感知し、Recoilで状態保持
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          photoUrl: user.photoURL,
          displayName: user.displayName,
        });
      }
    });
  }, [setUser]);

  return authUser;
};

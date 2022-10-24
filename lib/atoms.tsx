import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Post } from "./types";

const { persistAtom } = recoilPersist();

export const postState = atom<Post>({
  key: "postState",
  default: {
    id: "",
    appName: "",
    title: "",
    description: "",
    level: "",
    language: [],
    appUrl: "",
    github: "",
    postedDate: null,
    userId: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const usePostValue = () => {
  return useRecoilValue(postState);
};

import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PostType } from "../types/post";

const { persistAtom } = recoilPersist();

export const postState = atom<PostType>({
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

import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PostType } from "@/types/post";

const { persistAtom } = recoilPersist();

export const postState = atom<PostType>({
  key: "postState",
  default: {
    id: "",
    appName: "",
    title: "",
    description: "",
    image: "",
    level: "",
    language: [],
    appUrl: "",
    github: "",
    postedDate: null,
    authorId: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const postIdState = atom({
  key: "idState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const usePostValue = () => {
  return useRecoilValue(postState);
};

export const usePostIdValue = () => {
  return useRecoilValue(postIdState);
};

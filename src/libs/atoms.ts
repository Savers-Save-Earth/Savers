import { PostType } from "@/types/types";
import { atom } from "recoil";
interface EditAtomType {
  postDetail?: PostType | null;
  isEditing: boolean;
}

interface SearchPostAtom {
  keyword: string | null;
}

export const editPostAtom = atom<EditAtomType>({
  key: "editPostState",
  default: { postDetail: null, isEditing: false },
});

export const searchPostAtom = atom<SearchPostAtom>({
  key: "searchPostState",
  default: { keyword: null },
});
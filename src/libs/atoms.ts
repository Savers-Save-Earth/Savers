import { atom } from "recoil";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];
interface AtomType {
  postDetail?: PostType | null;
  isEditing: boolean;
}

export const editPostAtom = atom<AtomType>({
  key: "editPostState",
  default: { postDetail: null, isEditing: false },
});
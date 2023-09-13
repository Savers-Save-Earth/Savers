import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

// 게시글 수정
export const updateMissionHandler = async (missionId: string) => {
  if (!missionId) {
    return false;
  }

  const { data, error } = await supabase
    .from("missionList")
    .update({ doingYn: false })
    .eq("id", missionId);
  if (error) return error;
  return data;
};

export const getMissionHandler = async (
  currentUser: any,
  currentDate: string,
  category: string,
  setMissionUid: React.Dispatch<React.SetStateAction<string>>,
  bigCategory: string,
) => {
  if (!currentUser) {
    return false;
  }
  const { data: missionLists, error } = await supabase
    .from("missionList")
    .select("*")
    .eq("createdAt", currentDate)
    .eq("user_uid", currentUser?.uid || currentUser?.id)
    .eq("bigCategory", bigCategory)
    .eq("smallCategory", category)
    .eq("doingYn", true);
  if (error) return error;
  if (missionLists!.length < 1) return false;
  const matchingMission = missionLists!.find(
    (missionList) => missionList.smallCategory === category,
  );
  if (matchingMission) {
    setMissionUid(matchingMission.id);
  } else {
    setMissionUid("");
  }
};

export const likeShareMissionHandler = async (
  currentUser: any,
  currentDate: string,
  category: string,
  setMissionUid: React.Dispatch<React.SetStateAction<string>>,
  bigCategory: string,
) => {
  if (!currentUser) {
    return false;
  } else {
    const { data: missionLists, error } = await supabase
      .from("missionList")
      .select("*")
      .eq("createdAt", currentDate)
      .eq("user_uid", currentUser?.uid || currentUser?.id)
      .eq("bigCategory", bigCategory)
      .eq("smallCategory", category)
      .eq("doingYn", true);
    if (error) return error;

    if (missionLists!.length < 1) return false;
    const matchingMission = missionLists!.find(
      (missionList) => missionList.smallCategory === category,
    );
    if (matchingMission) {
      updateMissionHandler(matchingMission.id);
    } else {
    }
  }
};

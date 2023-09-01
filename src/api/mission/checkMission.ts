import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

// 게시글 수정
export const updateMissionHandler = async (missionId: string) => {
  if (!missionId) {
    console.log("미션아이디 누락");
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
  setMissionUid: any,
  bigCategory: string,
) => {
  if (!currentUser) {
    console.log("체크미션 커렌트유저 없음");
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
    console.log("미션매칭 성공");
    setMissionUid(matchingMission.id);
  } else {
    console.log("No matching mission found.");
    setMissionUid("");
  }
};

export const likeShareMissionHandler = async (
  currentUser: any,
  currentDate: string,
  category: string,
  setMissionUid: any,
  bigCategory: string,
) => {

  if (!currentUser) {
    console.log("체크미션 커렌트유저 없음");
    return false
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
      console.log("미션매칭 성공");
      updateMissionHandler(matchingMission.id);
    } else {
      console.log("No matching mission found.");
    }
  }
};

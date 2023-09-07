import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

export type ProfileType = {
  activePoint: number;
  birthday: string;
  email: string;
  nickname: string;
  number: string;
  profileImage: string;
  provider: string;
  uid: string;
} | null;

export type MissionList = {
  address: string;
  bigCategory: string;
  content: string;
  createdAt: string;
  doingYn: boolean;
  id: string;
  missionUid: string;
  point: number;
  smallCategory: string;
  title: string;
  user_uid: string;
  userId: string;
} | null;

export type Badge = {
  badge_title: string
  id: number
  user_id: string
} | null

// 유저 프로필 데이터 조회
export const fetchProfileData = async (
  searchId: string,
): Promise<ProfileType> => {
  try {
    const { data: profileData } = await supabase
      .from("user")
      .select("*")
      .eq("uid", searchId);

    // 데이터가 없는 경우 null 반환
    if (!profileData) {
      return null;
    }

    // 데이터가 있는 경우 해당 데이터를 반환
    return profileData[0];
  } catch (error) {
    throw error;
  }
};

//모든 미션리스트 조회
export const fetchMissionList = async (
  searchId: string,
): Promise<MissionList[] | null> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("user_uid", searchId);

    if (!missionList) {
      return null;
    }

    return missionList;
  } catch (error) {
    throw error;
  }
};

// 완료된 미션리스트만 조회
export const fetchMissionDone = async (
  searchId: string,
): Promise<MissionList[] | null> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("user_uid", searchId)
      .eq("doingYn", false)
    if (!missionList) {
      return null;
    }
    return missionList
  } catch (error) {
    throw error;
  }
};

// 진행중인 미션리스트만 조회
export const fetchMissionDoing = async (
  searchId: string, currentData: string
): Promise<MissionList[] | null> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("createdAt", currentData)
      .eq("user_uid", searchId)
      .eq("doingYn", true)
    if (!missionList) {
      return null;
    }
    return missionList
  } catch (error) {
    throw error;
  }
};

export const fetchBadges = async (
  searchId: string,
): Promise<Badge[] | null> => {
  try {
    const { data: badgeData } = await supabase
      .from("badge")
      .select("*")
      .eq("user_id", searchId);

    if (!badgeData) {
      return null;
    }

    return badgeData;
  } catch (error) {
    throw error;
  }
};

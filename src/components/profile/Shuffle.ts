type initialMission = {
  address: string;
  bigCategory: string;
  content: string;
  doingYn: boolean;
  id: string;
  point: number;
  smallCategory: string;
  title: string;
  uid: number;
  icon: string;
};

// import { initialMission } from "@/types/types";

export const fyShuffle = (arr: initialMission[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor((i + 1) * Math.random());
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 4)
};

import { Metadata } from "next";
import MissionDoingComp from "./MissionDongComp";

export const metadata: Metadata = {
  title: "진행중인 미션 | Savers",
  description: "진행중인 미션을 확인할 수 있어요.",
};

const MissionDoing = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <MissionDoingComp id = {id} />
  );
};

export default MissionDoing;
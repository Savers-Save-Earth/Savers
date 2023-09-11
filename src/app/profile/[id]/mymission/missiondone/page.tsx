import { Metadata } from "next";
import MissionDoneComp from "./MissionDoneComp";

export const metadata: Metadata = {
  title: "완료한 미션 | Savers",
  description: "완료한 미션을 확인할 수 있어요.",
};

const MissionDone = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <MissionDoneComp id = {id} />
  );
};

export default MissionDone;
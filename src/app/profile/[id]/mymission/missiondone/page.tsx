import { Metadata } from "next";
import MissionDoneComp from "./MissionDoneComp";
import Seo from "@/components/Seo";

const MissionDone = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Seo
        title="완료한 미션 | Savers"
        description="완료한 미션을 확인할 수 있어요."
      />
      <MissionDoneComp id={id} />
    </>
  );
};

export default MissionDone;

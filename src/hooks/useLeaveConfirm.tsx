import { useCallback, useState } from "react";
import { useRouteChangeEvents } from "nextjs-router-events";
import useBeforeUnload from "./useBeforeUnload"; // read further for an explanation
import FreezeModal from "@/components/community/ui/FreezeModal";
import { useRouter } from "next/navigation";

const useLeaveConfirm = (shouldPreventRouteChange: boolean) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setOpenModal(true);
      return false;
    }
    return true;
  }, [shouldPreventRouteChange]);

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange });
  useBeforeUnload(shouldPreventRouteChange);

  console.log("custom hook openModal >>> ", openModal);

  return (
    <FreezeModal
      open={openModal}
      onOpenChange={setOpenModal}
      onClick={() => {
        allowRouteChange();
      }}
      onClose={() => setOpenModal(false)}
    />
  );
};

export default useLeaveConfirm;

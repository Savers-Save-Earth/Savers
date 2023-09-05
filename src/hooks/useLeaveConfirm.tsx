import { useCallback, useState } from "react"
import { useRouteChangeEvents } from "nextjs-router-events"
import useBeforeUnload from './useBeforeUnload' // read further for an explanation
import FreezeModal from "@/components/community/ui/FreezeModal";
import { useRouter } from "next/navigation";
import { PATHNAME_MAIN } from "@/enums/community";

const useLeaveConfirm = (shouldPreventRouteChange: boolean) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setOpenModal(true)
      return false
    }
    return true
  }, [shouldPreventRouteChange])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })
  // this is technically unrelated to this package, but probably still is something you might want to do
  useBeforeUnload(shouldPreventRouteChange)

  console.log("custom Hook openModal >>> ", openModal);

  return (
    <FreezeModal
        open={openModal}
        onOpenChange={setOpenModal}
        onClick={() => {
          allowRouteChange();
          router.push(PATHNAME_MAIN);
        }}
        onClose={() => setOpenModal(false)}
      />
  )
}

export default useLeaveConfirm;
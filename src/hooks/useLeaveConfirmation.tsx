import { useCallback, useState } from "react"
import useRouteChangeEvents from "@/app/RouteChangeProvider"
import FreezeModal from "@/components/community/ui/common/FreezeModal";

const useLeaveConfirmation = (shouldPreventRouteChange: boolean) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setShowConfirmModal(true)
      return false
    }

    return true
  }, [shouldPreventRouteChange])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })

  return {
    confirmModal: (
      <FreezeModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        onClick={() => { allowRouteChange(); }}
        onClose={() => setShowConfirmModal(false)}
      />
    )
  }
}

export default useLeaveConfirmation
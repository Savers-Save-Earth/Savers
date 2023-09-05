import { useEffect } from "react"

// NOTE: although there is a message argument, you really should not be relying on it, as most, if not all, modern browsers completely ignore it anyways
const useBeforeUnload = (shouldPreventUnload: boolean, message?: string) => {
  useEffect(() => {
    const abortController = new AbortController()

    if (shouldPreventUnload)
      window.addEventListener('beforeunload', (ev) => {
        ev.preventDefault()

        return (ev.returnValue = message ?? '')
      }, { capture: true, signal: abortController.signal })

    return () => abortController.abort()
  }, [shouldPreventUnload, message])
}

export default useBeforeUnload;
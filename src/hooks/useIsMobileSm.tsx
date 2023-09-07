import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useIsMobileSm = () => {
  const [isMobileSm, setIsMobileSm] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width: 640px" });
  useEffect(() => {
    setIsMobileSm(mobile);
  }, [mobile]);

  return isMobileSm;
};

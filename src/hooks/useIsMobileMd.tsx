import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useIsMobileMd = () => {
  const [isMobileMd, setIsMobileMd] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width: 768px" });
  useEffect(() => {
    setIsMobileMd(mobile);
  }, [mobile]);

  return isMobileMd;
};

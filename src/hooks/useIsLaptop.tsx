import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useIsLaptop = () => {
  const [isLaptop, setIsLaptop] = useState(false);
  const laptop = useMediaQuery({ query: "(max-width: 1279px" });
  useEffect(() => {
    setIsLaptop(laptop);
  }, [laptop]);
  
  return isLaptop;
};
import { useEffect, useState } from "react";

interface IWindowSize {
  width: number;
  height: number;
}

export const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    width: windowSize.width,
    height: windowSize.height,
  };
};

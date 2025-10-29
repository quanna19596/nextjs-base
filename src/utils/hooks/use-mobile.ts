import { useEffect, useState } from "react";
import { EBreakpoint } from "@/common/enums";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${EBreakpoint.MD - 1}px)`);
    const onChange = (): void => {
      setIsMobile(window.innerWidth < EBreakpoint.MD);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < EBreakpoint.MD);
    return (): void => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
};

import { useEffect, RefObject  } from "react";

export default function OnClickOutside(ref: RefObject<HTMLElement> , cb: any): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)){
        cb();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
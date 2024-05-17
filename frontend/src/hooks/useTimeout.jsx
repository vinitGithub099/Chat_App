import { useEffect, useRef } from "react";

export function useTimeout(callBack, delay) {
  const savedCallBack = useRef();

  useEffect(() => {
    savedCallBack.current = callBack;
  }, [callBack]);

  useEffect(() => {
    const tick = () => savedCallBack.current();

    if (delay === null) return;

    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [delay]);
}

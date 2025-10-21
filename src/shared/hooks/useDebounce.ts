import { useCallback, useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedCallback;
}

export default useDebounce;
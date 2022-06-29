import { useState, useEffect } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    () => JSON.parse(sessionStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

/**
 * @NOTE - This does not work server-side. Should work in CRA, though. Maybe in Static too!
 */

import { useState, useEffect } from "react";


/**
 * @note - This does not work server-side. Should work in CRA, though!
 * @todo - Re-think logic to make it work server-side.
 * This hooks behaves identical to useState when working with server-generated pages.
 * The only difference being that it writes to sessionStorage.
 */

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let useSession: string;

  useEffect(() => {
    useSession = sessionStorage.getItem(key);
  }, []);
  const [state, setState] = useState<T>(() =>
    useSession ? JSON.parse(useSession) : initialValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}


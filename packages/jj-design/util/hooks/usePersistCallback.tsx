import { useCallback, useRef, useMemo } from 'react';

export default function usePersistCb<T extends Function>(callBack: T) {
  const cbRef = useRef<T>();
  cbRef.current = useMemo(() => callBack, [callBack]);

  const memoizedFn = useRef<any>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return cbRef.current?.apply(this, args);
    }
  }

  return memoizedFn.current;
}
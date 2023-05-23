import { useState } from 'react'
import usePersistCb from './usePersistCallback'

type Updater<T> = (
  updater: T | ((origin: T) => T),
  ignoreDestroy?: boolean,
) => void;

export default function useMergeState<T extends R, R = T>(
  defaultStateValue: T | (() => T),
  option?: {
    defaultValue?: T | (() => T);
    value?: T;
    onChange?: (value: T) => void;
    postState?: (value: T) => T;
  },
): [R, Updater<T>] {
  const { defaultValue, value, postState } = option || {};

  const [innerValue, setInnerValue] = useState<T>(() => {
    if (value !== undefined) {
      return value;
    } else if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
    } else {
      return typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue;
    }
  })

  const mergedState = value !== undefined ? value : innerValue;
  const postMergedValue = postState ? postState(mergedState) : mergedState;

  const triggerUpdate: Updater<T> = usePersistCb((updater) => {
    setInnerValue(updater)
  })

  return [postMergedValue, triggerUpdate]
}
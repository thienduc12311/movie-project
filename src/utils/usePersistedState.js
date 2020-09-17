import React, {useState, useEffect} from 'react';
import LocalStorageUtils from './LocalStorageUtils';

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => LocalStorageUtils.getItem(key) || defaultValue
  );
  useEffect(() => {
    LocalStorageUtils.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

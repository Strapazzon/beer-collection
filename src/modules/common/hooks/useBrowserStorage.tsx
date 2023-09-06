import { BrowserStorage } from "@modules/libs/localStorage";
import { useState } from "react";

export const useBrowserStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return BrowserStorage.get<T>(key) ?? initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    return BrowserStorage.set<T>(key, value);
  };

  return {
    storedValue,
    setValue,
  };
};

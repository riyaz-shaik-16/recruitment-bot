import { useState, useEffect } from "react";

function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (err) {
      return sessionStorage.getItem(key) || defaultValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      sessionStorage.setItem(key, value); 
    }
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;

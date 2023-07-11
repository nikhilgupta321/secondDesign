import React, { createContext, useState, useEffect } from 'react';
import { getSettings } from "../helper/api-settings";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [flash, setFlash] = useState({success: false, error: false, normal: false, msg: ''});

  function closeFlash() {
    setFlash({})
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getSettings(signal).then((data) => {
      if (data && data.error) {
        console.error(data.error)
      } else {
        setSettings(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <GlobalContext.Provider value={{ flash, setFlash, closeFlash, settings }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

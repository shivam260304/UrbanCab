/* eslint-disable no-undef */
/* eslint-disable react/prop-types */ 
import { createContext, useState, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = createContext();


const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  const updatecaptain = (captainData)=>{
    setCaptain(captainData);
  }

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updatecaptain,
  }

  return (
    <div>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;

import { createContext, useState, useContext } from "react";

const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [designData, setDesignData] = useState(null);

  return (
    <DesignContext.Provider value={{ designData, setDesignData }}>
      {children}
    </DesignContext.Provider>
  );
};

// Rename this hook to useDesign
export const useDesign = () => useContext(DesignContext);

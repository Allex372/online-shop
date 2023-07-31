import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const BacketProvider = ({ children }) => {
    const [showBacket, setShowBacket] = useState(false);

    const handleOpenBacket = () => {
        setShowBacket(!showBacket);
    }

    if (!Context) {
        return null;
    }

    return <Context.Provider value={{ showBacket, handleOpenBacket }}>{children}</Context.Provider>;
}

export default BacketProvider;

export const useBacket = () => useContext(Context);
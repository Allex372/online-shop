import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const SideBarProvider = ({ children }) => {
    const [menuStatus, setMenuStatus] = useState(false);

    const handleSideBar = () => {
        setMenuStatus(!menuStatus);
    };

    return <Context.Provider value={{ menuStatus, handleSideBar, setMenuStatus }}>{children}</Context.Provider>;
}

export default SideBarProvider;

export const useSideBar = () => useContext(Context);
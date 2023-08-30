import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const SideBarProvider = ({ children }) => {
    const [menuStatus, setMenuStatus] = useState(false);
    const [filterMenuStatus, setFilterMenuStatus] = useState(false);

    const handleSideBar = () => {
        setMenuStatus(!menuStatus);
    };

    const handleFilterMenu = () => {
        setFilterMenuStatus(!filterMenuStatus);
    };

    return <Context.Provider value={{ menuStatus, handleSideBar, setMenuStatus, filterMenuStatus, setFilterMenuStatus, handleFilterMenu }}>{children}</Context.Provider>;
}

export default SideBarProvider;

export const useSideBar = () => useContext(Context);
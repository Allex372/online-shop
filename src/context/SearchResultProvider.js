import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const SearchResultProvider = ({ children }) => {
    const [result, setResult] = useState(null);

    const changeSearchResult = (result) => {
        setResult(result);
    }

    return <Context.Provider value={{ result, changeSearchResult }}>{children}</Context.Provider>;
}

export default SearchResultProvider;

export const useResult = () => useContext(Context);
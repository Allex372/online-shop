import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const SearchResultProvider = ({ children }) => {
    const [searchResult, setSearchResult] = useState(null);

    const changeSearchResult = (result) => {
        setSearchResult(result);
    }

    return <Context.Provider value={{ searchResult, changeSearchResult }}>{children}</Context.Provider>;
}

export default SearchResultProvider;

export const useResult = () => useContext(Context);
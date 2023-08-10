import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

const ViewProvider = ({ children }) => {
    const [viewOptions, setViewOptions] = useState({
        gridView: true,
        listView: false,
    });

    useEffect(() => {
        const resetOptions = {
            gridView: false,
            listView: false,
        };

        const localStorageView = JSON.parse(localStorage.getItem('viewOption') || '[]');

        if (localStorageView === 'list') {
            setViewOptions({
                ...resetOptions,
                listView: true,
            });
        } else {
            setViewOptions({
                ...resetOptions,
                gridView: true,
            });
        }

    }, []);

    const changeGridView = (option) => {
        const resetOptions = {
            gridView: false,
            listView: false,
        };

        switch (option) {
            case 'grid':
                setViewOptions({
                    ...resetOptions,
                    gridView: true,
                });
                localStorage.setItem('viewOption', JSON.stringify('grid'));
                break;
            case 'list':
                setViewOptions({
                    ...resetOptions,
                    listView: true,
                });
                localStorage.setItem('viewOption', JSON.stringify('list'));
                break;
            default:
                setViewOptions((prevState) => ({
                    ...prevState,
                    [option]: !prevState[option],
                }));
                break;
        }
    };

    return <Context.Provider value={{ viewOptions, changeGridView }}>{children}</Context.Provider>;
}

export default ViewProvider;

export const useView = () => useContext(Context);
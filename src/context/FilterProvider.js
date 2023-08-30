import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const FilterProvider = ({ children }) => {
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [cultureFilter, setCultureFilter] = useState(null);
    const [chemistryFilter, setChemistryFilter] = useState(null);
    const [typeFilter, setTypeFilter] = useState(null);

    const [sortOptions, setSortOptions] = useState({
        alphabet: false,
        reverseAlphabet: false,
        priceHighToLow: false,
        priceLowToHigh: false,
        availability: false,
    });

    const handleSortOptionChange = (option) => {
        const resetOptions = {
            alphabet: false,
            reverseAlphabet: false,
            priceHighToLow: false,
            priceLowToHigh: false,
            availability: false,
        };

        switch (option) {
            case 'alphabet':
                setSortOptions({
                    ...resetOptions,
                    alphabet: true,
                });
                localStorage.setItem('sortOption', JSON.stringify('alphabet'));
                break;
            case 'reverseAlphabet':
                setSortOptions({
                    ...resetOptions,
                    reverseAlphabet: true,
                });
                localStorage.setItem('sortOption', JSON.stringify('reverseAlphabet'));
                break;
            case 'priceHighToLow':
                setSortOptions({
                    ...resetOptions,
                    priceHighToLow: true,
                });
                localStorage.setItem('sortOption', JSON.stringify('priceHighToLow'));
                break;
            case 'priceLowToHigh':
                setSortOptions({
                    ...resetOptions,
                    priceLowToHigh: true,
                });
                localStorage.setItem('sortOption', JSON.stringify('priceLowToHigh'));
                break;
            case 'availability':
                setSortOptions({
                    ...resetOptions,
                    availability: true,
                });
                localStorage.setItem('sortOption', JSON.stringify('availability'));
                break;
            default:
                setSortOptions((prevState) => ({
                    ...prevState,
                    [option]: !prevState[option],
                }));
                break;
        }
    };

    const changeCultureFilter = (result) => {
        setCultureFilter(result);
    }

    const changeChemistryFilter = (result) => {
        setChemistryFilter(result);
    }

    const changeTypeFilter = (result) => {
        setTypeFilter(result);
    }

    const handleOpenFilterModal = (boolean) => {
        setOpenFilterModal(boolean)
    }

    return <Context.Provider value={{ openFilterModal, cultureFilter, chemistryFilter, typeFilter, sortOptions, handleSortOptionChange, changeCultureFilter, changeChemistryFilter, changeTypeFilter, handleOpenFilterModal }}>{children}</Context.Provider>;
}

export default FilterProvider;

export const useFilter = () => useContext(Context);
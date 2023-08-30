import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

const BacketProvider = ({ children }) => {
    const [showBacket, setShowBacket] = useState(false);
    const [items, setItems] = useState([]);
    const [itemsWithSum, setItemsWithSum] = useState([]);
    const [totalSum, setTotalSum] = useState(0);


    const addItemToBacket = (item) => {
        setItems([...items, item]);
    };

    const removeItemFromBacket = (url) => {
        const updatedItems = items.filter((item) => item.url !== url);
        setItems(updatedItems);
    }

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('backetProducts') || '[]');
        setItems(storedItems);
    }, []);

    useEffect(() => {
        localStorage.setItem('backetProducts', JSON.stringify(items));
    }, [items]);

    const handleOpenBacket = () => {
        setShowBacket(!showBacket);
    }

    const updateItemCount = (itemId, newCount) => {
        newCount = Math.max(1, newCount);

        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, count: newCount };
                }
                return item;
            })
        );
    };

    useEffect(() => {
        // При зміні items, перераховуємо поля sum для кожного об'єкту
        const updatedItems = items.map((item) => {
            const { price, count } = item;
            const countValue = count || 1; // Якщо count не вказано, то приймаємо його як 1
            const sum = price * countValue;
            return { ...item, sum };
        });
        setItemsWithSum(updatedItems); // Оновлюємо стан itemsWithSum замість items

        const total = updatedItems.reduce((acc, item) => acc + item.sum, 0);
        setTotalSum(total);
    }, [items]);

    if (!Context) {
        return null;
    }

    return <Context.Provider value={{ showBacket, handleOpenBacket, items, addItemToBacket, updateItemCount, itemsWithSum, totalSum, removeItemFromBacket }}>{children}</Context.Provider>;
}

export default BacketProvider;

export const useBacket = () => useContext(Context);
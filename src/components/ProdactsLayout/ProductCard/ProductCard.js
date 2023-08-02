import React, { useState, useEffect } from "react";

import { useBacket } from "../../../context/BacketProvider";

import * as styles from './ProductCard.module.css'

export const ProductCard = ({ product }) => {
    const backetContext = useBacket();
    const { addItemToBacket, items, handleOpenBacket } = backetContext ? backetContext : {};

    const [isInBacket, setIsInBacket] = useState(null);

    const handleAddItem = (currentProduct) => {
        addItemToBacket(currentProduct);
    }

    useEffect(() => {
        setIsInBacket(items.some((item) => item.id === product?.id));
    }, [items]);

    return (
        <div key={product?.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
                {product?.img && <img src={product?.img} alt={product?.name} />}
            </div>

            <p className={styles.productName}>{product?.name}</p>
            <p className={styles.chemistryType}>Хімічна речовина: {product?.chemistry}</p>
            {isInBacket ?
                <button className={styles.buyButtonAdded} onClick={() => handleOpenBacket()}>В корзині</button>
                :
                <button className={styles.buyButton} onClick={() => handleAddItem(product)}>Купити</button>
            }
        </div>

    )
}
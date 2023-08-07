import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';

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
        <div key={product?.id} className={`${product?.isAvailable ? styles.productCard : styles.notAvailable}`}>
            <div className={styles.imageWrapper}>
                {
                    product?.img &&
                    (product?.isAvailable ? <Link className={styles.link} to={`/products/${product?.id}/${product?.name}`}>
                        < img src={product?.img} alt={product?.name} />
                    </Link >
                        :
                        < img src={product?.img} alt={product?.name} />
                    )
                }
            </div >

            {
                product?.isAvailable ?
                    <Link className={styles.link} to={`/products/${product?.id}/${product?.name}`}>
                        <p className={styles.productName}>{product?.name}</p>
                    </Link>
                    :
                    <p className={styles.productName}>{product?.name}</p>
            }
            <p className={styles.chemistryType}>Хімічна речовина: {product?.chemistry}</p>
            <p className={styles.price}>{product?.price}₴</p>
            {
                product?.isAvailable ?
                    (
                        isInBacket ?
                            <button className={styles.buyButtonAdded} onClick={() => handleOpenBacket()}>В корзині</button>
                            :
                            <button className={styles.buyButton} onClick={() => handleAddItem(product)}>Купити</button>)
                    :
                    <button className={styles.buyButton}>Купити</button>

            }
        </div >

    )
}
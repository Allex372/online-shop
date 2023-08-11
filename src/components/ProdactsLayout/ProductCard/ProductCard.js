import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';

import { useBacket } from "../../../context/BacketProvider";

import * as styles from './ProductCard.module.css'

export const ProductCard = ({ product, viewStyle }) => {
    const [viewOptions, setViewOptions] = useState({
        gridView: true,
        listView: false,
    });

    const view = viewStyle ? viewStyle : viewOptions;
    const backetContext = useBacket();
    const { addItemToBacket, items, handleOpenBacket } = backetContext ? backetContext : {};

    const [isInBacket, setIsInBacket] = useState(null);

    const handleAddItem = (currentProduct) => {
        addItemToBacket(currentProduct);
    }

    const handleBuyProduct = () => {
        handleOpenBacket();
        handleClick();
    }

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setIsInBacket(items.some((item) => item.id === product?.id));
    }, [items]);

    return (
        <div key={product?.id}
            className={`${(view?.gridView && product?.isAvailable) && styles.productCard}
        ${(view?.gridView && !product?.isAvailable) && styles.notAvailable}
        ${(view?.listView && product?.isAvailable) && styles.productCardListStyle}
        ${(view?.listView && !product?.isAvailable) && styles.notAvailableList}
        `}
        >

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

            <div className={`${viewStyle?.gridView ? styles.textStyleGrid : styles.textStyleList}`}>
                {(viewStyle?.listView && !product?.isAvailable) &&
                    <div className={styles.notAvailableMessage}>Немає в наявності</div>
                }
                {
                    product?.isAvailable ?
                        <Link className={styles.link} to={`/products/${product?.id}/${product?.name}`}>
                            <p className={styles.productName}>{product?.name}</p>
                        </Link>
                        :
                        <p className={styles.productName}>{product?.name}</p>
                }
                <p className={styles.chemistryType}>Хімічна речовина: {product?.chemistry}</p>
                <p className={styles.chemistryType}>Діюча речовина: діюча речовина</p>
                <p className={styles.price}>Ціна: {product?.price}₴</p>
                {
                    product?.isAvailable ?
                        (
                            isInBacket ?
                                <button className={styles.buyButtonAdded} onClick={() => handleBuyProduct()}>В корзині</button>
                                :
                                <button className={styles.buyButton} onClick={() => handleAddItem(product)}>Купити</button>)
                        :
                        <button className={styles.buyButton}>Купити</button>

                }
            </div>
        </div >

    )
}
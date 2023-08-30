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
        addItemToBacket(currentProduct.attributes);
    }

    const handleBuyProduct = () => {
        handleOpenBacket();
        handleClick();
    }

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setIsInBacket(items.some((item) => item.url === product?.attributes?.url));
    }, [items]);

    return (
        <div key={product?.id}
            className={`${(view?.gridView && product?.attributes?.isAvailable) && styles.productCard}
        ${(view?.gridView && !product?.attributes?.isAvailable) && styles.notAvailable}
        ${(view?.listView && product?.attributes?.isAvailable) && styles.productCardListStyle}
        ${(view?.listView && !product?.attributes?.isAvailable) && styles.notAvailableList}
        `}
        >

            <div className={styles.imageWrapper}>
                {
                    product?.attributes?.img?.data?.attributes?.url &&
                    (product?.attributes?.isAvailable ?
                        <Link className={styles.link} to={`/products/${product?.attributes?.url}/${product?.id}`}>
                            < img src={product?.attributes?.img?.data?.attributes?.url} alt={product?.attributes?.name} />
                        </Link >
                        :
                        < img src={product?.attributes?.img?.data?.attributes?.url} alt={product?.attributes?.name} />
                    )
                }
            </div >

            <div className={`${viewStyle?.gridView ? styles.textStyleGrid : styles.textStyleList}`}>
                {(viewStyle?.listView && !product?.attributes?.isAvailable) &&
                    <div className={styles.notAvailableMessage}>Немає в наявності</div>
                }
                {
                    product?.attributes?.isAvailable ?
                        <Link className={styles.link} to={`/products/${product?.attributes?.url}/${product?.id}`}>
                            <p className={styles.productName}>{product?.attributes?.name}</p>
                        </Link>
                        :
                        <p className={styles.productName}>{product?.attributes?.name}</p>
                }
                <p className={styles.chemistryType}>Тип препарату: {product?.attributes?.chemistry}</p>
                <p className={styles.chemistryType}>Діюча речовина: діюча речовина</p>
                <p className={styles.price}>Ціна: {product?.attributes?.price}₴</p>
                {
                    product?.attributes?.isAvailable ?
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
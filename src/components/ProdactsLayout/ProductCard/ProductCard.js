import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';

import { useBacket } from "../../../features/cart";
import { StrapiImage } from "../../StrapiImage";

import * as styles from './ProductCard.module.css'

const DEFAULT_VIEW = { gridView: true, listView: false };

export const ProductCard = ({ product, viewStyle, currencyRate = 1 }) => {
    const view = viewStyle ?? DEFAULT_VIEW;
    const backetContext = useBacket();
    const { addItemToBacket, items, handleOpenBacket } = backetContext ? backetContext : {};

    const [isInBacket, setIsInBacket] = useState(null);

    const handleChangeName = (name) => {
        if (name === 'Гербіциди') return 'Гербіцид';
        if (name === 'Фунгіциди') return 'Фунгіцид';
        if (name === 'Інсектициди') return 'Інсектицид';
        if (name === 'Протруйники') return 'Протруйник';
        if (name === 'Десиканти') return 'Десикант';
        if (name === "Прилипачі (ад'юванти)") return "Прилипач (ад'юванти)";
    }

    const handleAddItem = (currentProduct) => {
        currentProduct.attributes.id = currentProduct.id;
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
    }, [items, product?.attributes?.url]);

    const imageAttributes = product?.attributes?.img?.data?.attributes;

    return (
        <>
            {
                product?.attributes?.showProduct &&
                <div key={product?.id} className={`${view?.gridView && styles.productCard} ${view?.listView && styles.productCardListStyle}`}>
                    {!product?.attributes?.isAvailable &&
                        <div className={styles.notification}>{view?.listView ? `Під замовлення (до 3-ох робочих днів)` : `Під замовлення`}</div>
                    }
                    <div className={styles.imageWrapper}>
                        {
                            imageAttributes &&
                            <Link className={styles.link} to={`/products/${product?.attributes?.url}/${product?.id}`}>
                                <StrapiImage
                                    attributes={imageAttributes}
                                    alt={product?.attributes?.name || ''}
                                    className={styles.productImg}
                                />
                            </Link >
                        }
                    </div >

                    <div className={`${viewStyle?.gridView ? styles.textStyleGrid : styles.textStyleList}`}>
                        <Link className={styles.link} to={`/products/${product?.attributes?.url}/${product?.id}`}>
                            <p className={styles.productName}>{product?.attributes?.name}</p>
                            <p>{product?.attributes?.description}</p>
                        </Link>
                        <p className={styles.chemistryType}>{handleChangeName(product?.attributes?.chemistries?.data?.[0]?.attributes?.name)}</p>
                        <p className={styles.chemistryType}>Діюча речовина: {product?.attributes?.Active_substance}</p>
                        <p className={styles.price}>Ціна: {(+product?.attributes?.price * currencyRate).toFixed(2)} грн/л(кг)</p>
                        {
                            isInBacket ?
                                <button className={styles.buyButtonAdded} onClick={() => handleBuyProduct()}>В корзині</button>
                                :
                                <button className={styles.buyButton} onClick={() => handleAddItem(product)}>Купити</button>
                        }
                    </div>
                </div>
            }
        </>
    )
}

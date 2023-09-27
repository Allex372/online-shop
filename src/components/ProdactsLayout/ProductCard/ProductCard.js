import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from 'gatsby';

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

    const data = useStaticQuery(graphql`
        query {
            rest {
                currencies {
                    data {
                        attributes {
                            value
                        }
                    }
                }
            }
        }
    `);

    const Currencie = data?.rest?.currencies?.data[0]?.attributes.value;

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
    }, [items]);

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
                            product?.attributes?.img?.data?.attributes?.url &&

                            <Link className={styles.link} to={`/products/${product?.attributes?.url}/${product?.id}`}>
                                < img src={product?.attributes?.img?.data?.attributes?.url} alt={product?.attributes?.name} />
                            </Link >

                        }
                    </div >

                    <div className={`${viewStyle?.gridView ? styles.textStyleGrid : styles.textStyleList}`}>


                        <Link className={styles.link} to={`/products/${product?.attributes?.url}/${product?.id}`}>
                            <p className={styles.productName}>{product?.attributes?.name}</p>
                        </Link>


                        <p className={styles.chemistryType}>Тип препарату: {product?.attributes?.chemistries?.data?.[0]?.attributes?.name}</p>
                        <p className={styles.chemistryType}>Діюча речовина: {product?.attributes?.Active_substance}</p>
                        <p className={styles.price}>Ціна: {(+product?.attributes?.price * Currencie).toFixed(2)} грн</p>
                        {
                            isInBacket ?
                                <button className={styles.buyButtonAdded} onClick={() => handleBuyProduct()}>В корзині</button>
                                :
                                <button className={styles.buyButton} onClick={() => handleAddItem(product)}>Купити</button>
                        }
                    </div>
                </div >
            }
        </>

    )
}
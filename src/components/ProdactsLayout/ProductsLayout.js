import React from 'react';
import { ProductCard } from './ProductCard';

import * as styles from './ProductsLayout.module.css'

const DEFAULT_VIEW = { gridView: true, listView: false };

export const ProductsLayout = ({ array, viewStyle, currencyRate = 1 }) => {
    const view = viewStyle ?? DEFAULT_VIEW;

    return (
        <>
            <div className={`${view?.gridView ? styles.productWrapperGrid : styles.productWrapperList}`}>
                {array.map((el) => {
                    const { id } = el;
                    return (
                        <ProductCard viewStyle={viewStyle} product={el} currencyRate={currencyRate} key={+id} />
                    )
                })}

            </div>
            {!array.length && (
                <p className={styles.notFoundMessage}>Товарів не знайдено <span>&#128530;</span></p>
            )}
        </>

    )
}
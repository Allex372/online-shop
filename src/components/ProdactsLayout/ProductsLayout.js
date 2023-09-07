import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

import * as styles from './ProductsLayout.module.css'

export const ProductsLayout = ({ array, viewStyle }) => {
    const [viewOptions, setViewOptions] = useState({
        gridView: true,
        listView: false,
    });

    const view = viewStyle ? viewStyle : viewOptions;

    return (
        <>
            <div className={`${view?.gridView ? styles.productWrapperGrid : styles.productWrapperList}`}>
                {array.map((el) => {
                    const { id } = el;
                    return (
                        <ProductCard viewStyle={viewStyle} product={el} key={+id} />
                    )
                })}

            </div>
            {!array.length && (
                <p className={styles.notFoundMessage}>Товарів не знайдено <span>&#128530;</span></p>
            )}
        </>

    )
}
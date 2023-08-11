import React, { useEffect } from 'react';
import { ProductCard } from './ProductCard';

import * as styles from './ProductsLayout.module.css'

export const ProductsLayout = ({ array, viewStyle }) => {
    const grid = true;
    const view = viewStyle ? viewStyle : grid = true;
    useEffect(() => {
        console.log(view);
    }, []);
    return (
        <div className={`${view?.gridView ? styles.productWrapperGrid : styles.productWrapperList}`}>
            {array.map((el) => {
                const { id } = el;
                return (
                    <ProductCard viewStyle={viewStyle} product={el} key={id} />
                )
            })}
        </div>
    )
}
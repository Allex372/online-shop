import React from 'react';
import { ProductCard } from './ProductCard';

import * as styles from './ProductsLayout.module.css'

export const ProductsLayout = ({ array, viewStyle }) => {
    return (
        <div className={`${viewStyle?.gridView ? styles.productWrapperGrid : styles.productWrapperList}`}>
            {array.map((el) => {
                const { id } = el;
                return (
                    <ProductCard viewStyle={viewStyle} product={el} key={id} />
                )
            })}
        </div>
    )
}
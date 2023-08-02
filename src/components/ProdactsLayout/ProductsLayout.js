import React from 'react';
import { ProductCard } from './ProductCard';

import * as styles from './ProductsLayout.module.css'

export const ProductsLayout = ({ array }) => {
    return (
        <div className={styles.productWrapper}>
            {array.map((el) => {
                const { id } = el;
                return (
                    <ProductCard product={el} key={id} />
                )
            })}
        </div>
    )
}
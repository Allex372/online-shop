import React from 'react';
import { ProductCard } from './ProductCard';

import * as styles from './ProductsLayout.module.css'

export const ProductsLayout = ({ array }) => {
    return (
        <div className={styles.productWrapper}>
            {array.map((el) => {
                const { id, name, img, chemistry } = el;
                return (
                    <ProductCard id={id} name={name} img={img} chemistry={chemistry} key={id} />
                )
            })}
        </div>
    )
}
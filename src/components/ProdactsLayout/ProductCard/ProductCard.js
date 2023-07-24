import * as React from "react";

import * as styles from './ProductCard.module.css'

export const ProductCard = ({ id, img, name, chemistry }) => {

    return (
        <div key={id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
                {img && <img src={img} alt={name} />}
            </div>

            <p className={styles.productName}>{name}</p>
            <p className={styles.chemistryType}>Хімічна речовина: {chemistry}</p>
        </div>

    )
}
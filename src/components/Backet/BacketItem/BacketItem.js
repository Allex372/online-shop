import React, { useState } from 'react';
import { useBacket } from "../../../context/BacketProvider";

import * as styles from './BacketItem.module.css';

import closeIcon from '../../../images/close.png';

export const BacketItem = ({ items }) => {
    const backetContext = useBacket();
    const { updateItemCount, removeItemFromBacket, handleOpenBacket } = backetContext ? backetContext : {};

    const handleIncrement = (id, count) => {
        const newCount = Math.min((count || 1) + 1, 10);
        updateItemCount(id, newCount);
    };

    const handleDecrement = (id, count) => {
        const newCount = Math.max((count || 1) - 1, 1);
        updateItemCount(id, newCount);
    };
    return (
        <>
            {
                items?.length ?
                    (items.map((item) => {
                        const { img, name, price, description, id, count } = item;
                        return (
                            <div className={styles.wrapper} key={id}>
                                <div className={styles.productWrapper}>
                                    <div className={styles.imgWrapper} onClick={() => removeItemFromBacket(id)}>
                                        <img src={closeIcon} alt='close' />
                                    </div>
                                    <div className={styles.contentWrapper}>
                                        <div className={styles.content}>
                                            <div className={styles.productImageWrapper}>
                                                <img src={img} alt='item' />
                                            </div>
                                            <div className={styles.textWrapper}>
                                                <p className={styles.name}>{name}</p>
                                                <p className={styles.descriptionText}>
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.priseWrapper}>
                                    <div className={styles.counterContainer}>
                                        <button onClick={() => handleDecrement(id, count)}>-</button>
                                        <div className={styles.counter}>
                                            <p>{count ? count : 1}</p>
                                        </div>
                                        <button onClick={() => handleIncrement(id, count)}>+</button>
                                    </div>
                                    <p className={styles.itemPrice}>{price}₴</p>
                                </div>
                            </div>
                        )
                    }))
                    :
                    <div className={styles.clearBacket}>
                        <p>В корзині немає товарів</p>
                        <button className={styles.buttonBack} onClick={() => handleOpenBacket()}>До покупок</button>
                    </div>
            }
        </>
    );
};

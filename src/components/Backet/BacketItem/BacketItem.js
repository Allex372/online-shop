import React from 'react';
import { useBacket } from "../../../context/BacketProvider";

import * as styles from './BacketItem.module.css';

import closeIcon from '../../../images/close.png';

export const BacketItem = ({ items, statusCode, clearStatusCode, currencie }) => {
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

    const handleButtonBackClick = () => {
        clearStatusCode();
        handleOpenBacket();
    }

    return (
        <>
            {
                items?.length ?
                    (items.map((item) => {
                        const { img, name, price, description, id, count, url } = item;
                        return (
                            <div className={styles.wrapper} key={id}>
                                <div className={styles.productWrapper}>
                                    <div
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                handleOpenBacket();
                                            }
                                        }}
                                        role="button"
                                        tabIndex="0"
                                        className={styles.imgWrapper}
                                        onClick={() => removeItemFromBacket(url)}>
                                        <img src={closeIcon} alt='close' />
                                    </div>
                                    <div>
                                        <div className={styles.content}>
                                            <div className={styles.productImageWrapper}>
                                                <img src={img?.data?.attributes?.url} alt='item' />
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
                                    <p className={styles.itemPrice}>{(price * currencie).toFixed(2)}₴</p>
                                </div>
                            </div>
                        )
                    }))
                    :
                    null
            }

            {
                (!items?.length && statusCode !== 200) &&
                <div className={styles.clearBacket}>
                    <p>В корзині немає товарів</p>
                    <button className={styles.buttonBack} onClick={() => handleOpenBacket()}>До покупок</button>
                </div>
            }

            {
                (!items?.length && statusCode === 200) &&
                <div className={styles.clearBacket}>
                    <p>Замовлення успішно оформлено, очікуйте на дзвінок</p>
                    <button className={styles.buttonBack} onClick={() => handleButtonBackClick()}>До покупок</button>
                </div>
            }
        </>
    );
};

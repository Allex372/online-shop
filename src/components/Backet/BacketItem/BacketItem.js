import React, { useState } from 'react';

import * as styles from './BacketItem.module.css';

import closeIcon from '../../../images/close.png';
import bottleSmall from '../../../images/smallBottle.png';

export const BacketItem = ({ img, description, price }) => {
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount((prevCount) => Math.min(prevCount + 1, 10));
    };

    const handleDecrement = () => {
        setCount((prevCount) => Math.max(prevCount - 1, 1));
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.productWrapper}>
                    <div className={styles.imgWrapper}>
                        <img src={closeIcon} alt='close' />
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <div className={styles.productImageWrapper}>
                                <img src={bottleSmall} alt='item' />
                            </div>
                            <p className={styles.descriptionText}>
                                Системний післясходовий гербіцид для контролю однорічних широколистих
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.priseWrapper}>
                    <div className={styles.counterContainer}>
                        <button onClick={handleDecrement}>-</button>
                        <div className={styles.counter}>
                            <p>{count}</p>
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <p className={styles.itemPrice}>700₴</p>
                </div>
            </div>

            {/* <div className={styles.wrapper}>
                <div className={styles.productWrapper}>
                    <div className={styles.imgWrapper}>
                        <img src={closeIcon} alt='close' />
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <div className={styles.productImageWrapper}>
                                <img src={bottleSmall} alt='item' />
                            </div>
                            <p className={styles.descriptionText}>
                                Системний післясходовий гербіцид для контролю однорічних широколистих
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.priseWrapper}>
                    <div className={styles.counterContainer}>
                        <button onClick={handleDecrement}>-</button>
                        <div className={styles.counter}>
                            <p>{count}</p>
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <p className={styles.itemPrice}>700₴</p>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.productWrapper}>
                    <div className={styles.imgWrapper}>
                        <img src={closeIcon} alt='close' />
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <div className={styles.productImageWrapper}>
                                <img src={bottleSmall} alt='item' />
                            </div>
                            <p className={styles.descriptionText}>
                                Системний післясходовий гербіцид для контролю однорічних широколистих
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.priseWrapper}>
                    <div className={styles.counterContainer}>
                        <button onClick={handleDecrement}>-</button>
                        <div className={styles.counter}>
                            <p>{count}</p>
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <p className={styles.itemPrice}>700₴</p>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.productWrapper}>
                    <div className={styles.imgWrapper}>
                        <img src={closeIcon} alt='close' />
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <div className={styles.productImageWrapper}>
                                <img src={bottleSmall} alt='item' />
                            </div>
                            <p className={styles.descriptionText}>
                                Системний післясходовий гербіцид для контролю однорічних широколистих
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.priseWrapper}>
                    <div className={styles.counterContainer}>
                        <button onClick={handleDecrement}>-</button>
                        <div className={styles.counter}>
                            <p>{count}</p>
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <p className={styles.itemPrice}>700₴</p>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.productWrapper}>
                    <div className={styles.imgWrapper}>
                        <img src={closeIcon} alt='close' />
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <div className={styles.productImageWrapper}>
                                <img src={bottleSmall} alt='item' />
                            </div>
                            <p className={styles.descriptionText}>
                                Системний післясходовий гербіцид для контролю однорічних широколистих
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.priseWrapper}>
                    <div className={styles.counterContainer}>
                        <button onClick={handleDecrement}>-</button>
                        <div className={styles.counter}>
                            <p>{count}</p>
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <p className={styles.itemPrice}>700₴</p>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.productWrapper}>
                    <div className={styles.imgWrapper}>
                        <img src={closeIcon} alt='close' />
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            <div className={styles.productImageWrapper}>
                                <img src={bottleSmall} alt='item' />
                            </div>
                            <p className={styles.descriptionText}>
                                Системний післясходовий гербіцид для контролю однорічних широколистих
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.priseWrapper}>
                    <div className={styles.counterContainer}>
                        <button onClick={handleDecrement}>-</button>
                        <div className={styles.counter}>
                            <p>{count}</p>
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <p className={styles.itemPrice}>700₴</p>
                </div>
            </div> */}

        </>
    );
};

import React from 'react';
import { Link } from 'gatsby';

import { useFilter } from '../../context/FilterProvider';

import * as styles from './LinkPictures.module.css';

import line from '../../images/RedLine.svg';

export const LinkPictures = () => {
    const resultContext = useFilter();
    const { changeTypeFilter } = resultContext ? resultContext : {};
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>

                <div className={styles.fLineWrapper}>
                    <img src={line} alt='line' className={styles.lineImg} />
                </div>

                <div className={styles.sLineWrapper}>
                    <img src={line} alt='line' className={styles.lineImg} />
                </div>

                <Link to="/products"
                    onClick={() => changeTypeFilter('фермерське')}
                    className={styles.fermerBtn}>
                    Фермерське
                </Link>

                <Link to="/products"
                    onClick={() => changeTypeFilter('присадибне')}
                    className={styles.oneBtn}>
                    Присадибне
                </Link>

                <div className={styles.tLineWrapper}>
                    <img src={line} alt='line' className={styles.lineImg} />
                </div>

                <div className={styles.fourthLineWrapper}>
                    <img src={line} alt='line' className={styles.lineImg} />
                </div>

            </div>
        </div>
    )
}

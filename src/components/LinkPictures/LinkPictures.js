import React from 'react';
import { Link } from 'gatsby';
import { useFilter } from '../../context/FilterProvider';
import * as styles from './LinkPictures.module.css';

export const LinkPictures = () => {
    const resultContext = useFilter();
    const { changeTypeFilter } = resultContext ? resultContext : {};
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Link
                    className={styles.image1}
                    to="/products"
                    onClick={() => changeTypeFilter('фермерське')}
                >
                    <div className={styles.viewMoreOne}>
                        <p className={styles.title}>Фермерське</p>
                        <p className={styles.text}>Дивитися детальніше</p>
                    </div>
                </Link>
                <Link
                    className={styles.image2}
                    to="/products"
                    onClick={() => changeTypeFilter('присадибне')}
                >
                    <div className={styles.viewMoreMany}>
                        <p className={styles.title}>Присадибне</p>
                        <p className={styles.text}>Дивитися детальніше</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

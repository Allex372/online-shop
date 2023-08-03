import React from 'react';
import { Link } from 'gatsby';
import * as styles from './LinkPictures.module.css';

export const LinkPictures = () => {
    const handleViewMore = (filter) => {
        // Виконуємо необхідні дії при кліку на "Дивитися детальніше"
        // Наприклад, можна відправити фільтр в gatsby-node.js

        // Виконуємо дії для фільтра filter
    };
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <div className={styles.image1}>
                    <div className={styles.viewMoreOne}>
                        <Link
                            className={styles.linkedText}
                            to="/products/rozdrib"
                            onClick={() => handleViewMore('rozdrib')}
                        >
                            <p className={styles.title}>Присадибне</p>
                            <p className={styles.text}>Дивитися детальніше</p>
                        </Link>

                    </div>
                </div>
                <div className={styles.image2}>
                    <div className={styles.viewMoreMany}>
                        <Link
                            className={styles.linkedText}
                            to="/products/gurt"
                            onClick={() => handleViewMore('gurt')}
                        >
                            <p className={styles.title}>Фермерське</p>
                            <p className={styles.text}>Дивитися детальніше</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

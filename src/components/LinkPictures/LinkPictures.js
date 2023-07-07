import React from 'react';
import * as styles from './LinkPictures.module.css';

export const LinkPictures = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <div className={styles.image1}>
                    <div className={styles.viewMoreOne}>
                        <p className={styles.title}>Роздріб</p>
                        <p className={styles.text}>Дивитися детальніше</p>
                    </div>
                </div>
                <div className={styles.image2}>
                    <div className={styles.viewMoreMany}>
                        <p className={styles.title}>Гурт</p>
                        <p className={styles.text}>Дивитися детальніше</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

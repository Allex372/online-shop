import React, { useState, useEffect } from 'react';

import * as styles from './ImageModal.module.css';

export const ImageModal = ({ isOpen, data, children }) => {
    const [style, setStyle] = useState(styles.container);

    useEffect(() => {
        if (isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.classList.add(styles.bodyNoScroll);
            document.body.classList.add(styles.bodyGrey);
            setStyle(`${styles.container} ${styles.active}`);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
            document.body.classList.remove(styles.bodyGrey);
            setStyle(styles.container);
        }
    }, [isOpen]);

    return (
        <>
            <div className={style}>
                {/* <FilterComponent result={result} /> */}
                <div className={styles.imgWrapper}>
                    {children}
                    <img src={data} alt='Регламент застосування' className={styles.imgTable} />
                </div>
                <div className={styles.phoneWrapper}>
                    <div className={styles.phone}>
                    </div>
                    <div className={styles.message}>
                        Поверніть телефон для зручнішого читання!
                    </div>
                </div>
            </div>
        </>
    )
}

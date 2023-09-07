import React, { useState, useEffect } from 'react';
import { FilterComponent } from '../FilterComponent';

import * as styles from './FiltersModal.module.css';

export const FiltersModal = ({ isOpen, result }) => {
    const [style, setStyle] = useState(styles.container);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add(styles.bodyNoScroll);
            setStyle(`${styles.container} ${styles.active}`);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
            setStyle(styles.container);
        }
    }, [isOpen]);

    return (
        <>
            <div className={style}>
                <FilterComponent result={result} />
            </div>
        </>
    )
}

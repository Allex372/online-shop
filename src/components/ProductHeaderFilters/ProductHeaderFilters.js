import React from 'react';

import * as styles from './ProductHeaderFilters.module.css';

import searchIcon from '../../images/search.svg';

export const ProductHeaderFilters = ({ result }) => {
    return (
        <div className={styles.container}>
            <div className={styles.resultBlock}><p>Знайдено: {result}</p></div>
            <div className={styles.searchContainer}>
                <div>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Шукати"
                    />
                </div>
                <img
                    src={searchIcon}
                    className={styles.searchIcon}
                    alt="Search Icon"
                />
            </div>
            <div className={styles.helperDiv}></div>
        </div>
    );
};

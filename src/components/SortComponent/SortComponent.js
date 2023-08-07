import React, { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterProvider';

import sortIcon from '../../images/sort-icons/sort.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './SortComponent.module.css';

export const SortComponent = () => {
    const resultFilterContext = useFilter();
    const { handleSortOptionChange, sortOptions } = resultFilterContext ? resultFilterContext : {};

    const [showCheckboxes, setShowCheckboxes] = useState(false);

    const handleToggleCheckboxes = () => {
        setShowCheckboxes((prevState) => !prevState);
    };

    useEffect(() => {
        const isInLocalStorage = JSON.parse(localStorage.getItem('sortOption'));
        if (!isInLocalStorage) {
            handleSortOptionChange('alphabet');
        } else {
            handleSortOptionChange(isInLocalStorage);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper} onClick={handleToggleCheckboxes}>
                <div className={styles.filterIconWrapper}>
                    <img src={sortIcon} alt='sort' />
                </div>
                <p className={styles.filterText}>Сортувати за</p>
                <div className={styles.filterIconWrapper}>
                    <img src={arrowDown} className={`${showCheckboxes && styles.rotateImage}`} alt='sort' />
                </div>
            </div>

            <div className={styles.dropdown}>
                <div
                    className={`${styles.checkboxes} ${showCheckboxes ? styles.show : ''}`}
                >
                    <button
                        className={`${styles.optionButton} ${sortOptions.alphabet && styles.selected}`}
                        onClick={() => handleSortOptionChange('alphabet')}
                    >
                        За алфавітом: A-Я
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.reverseAlphabet && styles.selected}`}
                        onClick={() => handleSortOptionChange('reverseAlphabet')}
                    >
                        За алфавітом: Я-A
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.priceHighToLow && styles.selected}`}
                        onClick={() => handleSortOptionChange('priceHighToLow')}
                    >
                        Від більшої ціни до меншої
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.priceLowToHigh && styles.selected}`}
                        onClick={() => handleSortOptionChange('priceLowToHigh')}
                    >
                        Від меншої ціни до більшої
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.availability && styles.selected}`}
                        onClick={() => handleSortOptionChange('availability')}
                    >
                        За наявністю
                    </button>
                </div>
            </div>
        </div>
    )
}

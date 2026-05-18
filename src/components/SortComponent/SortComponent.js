import React, { useState, useEffect } from 'react';
import { useFilter, useSideBar } from '../../features/catalog';

import sortIcon from '../../images/sort-icons/sort.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './SortComponent.module.css';

export const SortComponent = () => {
    const sideBarContext = useSideBar();
    const { handleSideBar } = sideBarContext ? sideBarContext : {};

    const resultFilterContext = useFilter();
    const { handleSortOptionChange, sortOptions } = resultFilterContext ? resultFilterContext : {};

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showSearchButton, setSearchTypeButton] = useState(false);

    useEffect(() => {
        const isAnyOptionTrue = Object.values(sortOptions).some(value => value === true);
        if (isAnyOptionTrue) {
            setSearchTypeButton(true);
        }
    }, [sortOptions]);

    const handleToggleCheckboxes = () => {
        setShowCheckboxes((prevState) => !prevState);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialize sort from localStorage once on mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('sortOption'));
        handleSortOptionChange(stored ?? 'alphabet');
    }, []);

    return (
        <div className={styles.container}>
            <button type="button" className={styles.titleWrapper} onClick={handleToggleCheckboxes}>
                <div className={styles.filterIconWrapper}>
                    <img src={sortIcon} alt='sort' />
                </div>
                <p className={styles.filterText}>Сортувати за</p>
                <div className={styles.filterIconWrapper}>
                    <img src={arrowDown} className={`${showCheckboxes && styles.rotateImage}`} alt='' />
                </div>
            </button>

            <div className={styles.dropdown}>
                <div
                    className={`${styles.checkboxes} ${showCheckboxes ? styles.show : ''}`}
                >
                    <button
                        className={`${styles.optionButton} ${sortOptions?.alphabet && styles.selected}`}
                        onClick={() => handleSortOptionChange('alphabet')}
                    >
                        За алфавітом: A-Я
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions?.reverseAlphabet && styles.selected}`}
                        onClick={() => handleSortOptionChange('reverseAlphabet')}
                    >
                        За алфавітом: Я-A
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions?.priceHighToLow && styles.selected}`}
                        onClick={() => handleSortOptionChange('priceHighToLow')}
                    >
                        Від більшої ціни до меншої
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions?.priceLowToHigh && styles.selected}`}
                        onClick={() => handleSortOptionChange('priceLowToHigh')}
                    >
                        Від меншої ціни до більшої
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions?.availability && styles.selected}`}
                        onClick={() => handleSortOptionChange('availability')}
                    >
                        За наявністю
                    </button>
                    {showSearchButton && <button className={`${styles.resetButton}`} onClick={() => handleSideBar()}>Показати</button>}
                </div>
            </div>
        </div>
    )
}

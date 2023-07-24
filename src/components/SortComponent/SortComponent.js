import React, { useState } from 'react';

import sortIcon from '../../images/sort-icons/sort.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './SortComponent.module.css';

export const SortComponent = () => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    const [sortOptions, setSortOptions] = useState({
        alphabet: false,
        reverseAlphabet: false,
        priceHighToLow: false,
        priceLowToHigh: false,
        availability: false,
    });

    const handleToggleCheckboxes = () => {
        setShowCheckboxes((prevState) => !prevState);
    };

    const handleOptionChange = (option) => {
        const resetOptions = {
            alphabet: false,
            reverseAlphabet: false,
            priceHighToLow: false,
            priceLowToHigh: false,
            availability: false,
        };

        switch (option) {
            case 'alphabet':
                setSortOptions({
                    ...resetOptions,
                    alphabet: true,
                });
                break;
            case 'reverseAlphabet':
                setSortOptions({
                    ...resetOptions,
                    reverseAlphabet: true,
                });
                break;
            case 'priceHighToLow':
                setSortOptions({
                    ...resetOptions,
                    priceHighToLow: true,
                });
                break;
            case 'priceLowToHigh':
                setSortOptions({
                    ...resetOptions,
                    priceLowToHigh: true,
                });
                break;
            case 'availability':
                setSortOptions({
                    ...resetOptions,
                    availability: true,
                });
                break;
            default:
                setSortOptions((prevState) => ({
                    ...prevState,
                    [option]: !prevState[option],
                }));
                break;
        }
    };

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
                        onClick={() => handleOptionChange('alphabet')}
                    >
                        За алфавітом: A-Я
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.reverseAlphabet && styles.selected}`}
                        onClick={() => handleOptionChange('reverseAlphabet')}
                    >
                        За алфавітом: Я-A
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.priceHighToLow && styles.selected}`}
                        onClick={() => handleOptionChange('priceHighToLow')}
                    >
                        Від більшої ціни до меншої
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.priceLowToHigh && styles.selected}`}
                        onClick={() => handleOptionChange('priceLowToHigh')}
                    >
                        Від меншої ціни до більшої
                    </button>
                    <button
                        className={`${styles.optionButton} ${sortOptions.availability && styles.selected}`}
                        onClick={() => handleOptionChange('availability')}
                    >
                        За наявністю
                    </button>
                </div>
            </div>
        </div>
    )
}

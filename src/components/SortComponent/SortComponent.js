import React, { useState, useEffect } from 'react';
import { useFilter } from '../../features/catalog';

import sortIcon from '../../images/sort-icons/sort.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './SortComponent.module.css';

const SORT_OPTIONS = [
  { key: 'alphabet', label: 'За алфавітом: A-Я' },
  { key: 'reverseAlphabet', label: 'За алфавітом: Я-A' },
  { key: 'priceHighToLow', label: 'Від більшої ціни до меншої' },
  { key: 'priceLowToHigh', label: 'Від меншої ціни до більшої' },
  { key: 'availability', label: 'За наявністю' },
];

export const SortComponent = () => {
  const { handleSortOptionChange, sortOptions } = useFilter() || {};

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sortOption');
    if (stored) {
      try {
        handleSortOptionChange?.(JSON.parse(stored));
        return;
      } catch {
        /* ignore invalid stored value */
      }
    }
    handleSortOptionChange?.('alphabet');
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once
  }, []);

  const selectOption = (key) => {
    handleSortOptionChange?.(key);
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.titleWrapper} ${isOpen ? styles.titleWrapperOpen : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={styles.filterIconWrapper}>
          <img src={sortIcon} alt="" />
        </div>
        <p className={styles.filterText}>Сортувати за</p>
        <div className={styles.filterIconWrapper}>
          <img
            src={arrowDown}
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
            alt=""
          />
        </div>
      </button>

      <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`}>
        <div className={styles.checkboxes}>
          {SORT_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`${styles.optionButton} ${sortOptions?.[key] ? styles.selected : ''}`}
              onClick={() => selectOption(key)}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className={styles.applyButton}
            onClick={() => setIsOpen(false)}
          >
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
};

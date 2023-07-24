import React, { useState } from 'react';

import filterIcon from '../../images/sort-icons/filter.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './FilterComponent.module.css';

export const FilterComponent = () => {
    const [showTypeCheckboxes, setShowTypeCheckboxes] = useState(false);
    const [showChemistryCheckboxes, setShowChemistryCheckboxes] = useState(false);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedTypeState, setTypeCheckboxState] = useState('');
    const [selectedChemistryState, setCheckboxChemistryState] = useState('');

    const handleToggleCheckboxes = () => {
        setShowCheckboxes((prevState) => !prevState);
    };

    const handleCropChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCrop(checked ? name : '');
    };

    const handleToggleChemistryChange = () => {
        setShowChemistryCheckboxes((prevState) => !prevState);
    };

    const handleTypeChemistryChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxChemistryState(checked ? name : '');
    };

    const handleToggleTypeCheckboxes = () => {
        setShowTypeCheckboxes((prevState) => !prevState);
    };

    const handleTypeChange = (event) => {
        const { name, checked } = event.target;
        setTypeCheckboxState(checked ? name : '');
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <div className={styles.filterIconWrapper}>
                    <img src={filterIcon} alt='filter' />
                </div>
                <p className={styles.filterText}>Фільтри</p>
            </div>

            <div className={styles.dropdown}>
                <div className={styles.filterTitleWrapper} onClick={handleToggleCheckboxes}>
                    <div className={styles.arrowWrapper}>
                        <img src={arrowDown} className={`${showCheckboxes && styles.rotateImage}`} alt='arrow' />
                    </div>
                    <p className={styles.title}>Культури</p>
                </div>
                <div
                    className={`${styles.checkboxes} ${showCheckboxes ? styles.show : ''}`}
                >
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="wheat"
                            className={styles.checkboxColor}
                            checked={selectedCrop === 'wheat'}
                            onChange={handleCropChange}
                        />
                        <p>Пшениця</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="sunflower"
                            checked={selectedCrop === 'sunflower'}
                            onChange={handleCropChange}
                        />
                        <p>Соняшник</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="soybean"
                            checked={selectedCrop === 'soybean'}
                            onChange={handleCropChange}
                        />
                        <p>Соя</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="apple"
                            checked={selectedCrop === 'apple'}
                            onChange={handleCropChange}
                        />
                        <p>Яблуко</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="rapeseed"
                            checked={selectedCrop === 'rapeseed'}
                            onChange={handleCropChange}
                        />
                        <p>Ріпак</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="tomatoes"
                            checked={selectedCrop === 'tomatoes'}
                            onChange={handleCropChange}
                        />
                        <p>Помідори</p>
                    </label>
                </div>
            </div>

            <div className={styles.dropdown}>
                <div className={styles.filterTitleWrapper} onClick={handleToggleChemistryChange}>
                    <div className={styles.arrowWrapper}>
                        <img src={arrowDown} className={`${showChemistryCheckboxes && styles.rotateImage}`} alt='arrow' />
                    </div>
                    <p className={styles.title}>Тип продукту</p>
                </div>
                <div
                    className={`${styles.checkboxes} ${showChemistryCheckboxes ? styles.show : ''}`}
                >
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="gerbicydy"
                            className={styles.checkboxColor}
                            checked={selectedChemistryState === 'gerbicydy'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Гербіциди</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="fungicydy"
                            checked={selectedChemistryState === 'fungicydy'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Фунгіциди</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="inectecydy"
                            checked={selectedChemistryState === 'inectecydy'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Інсектециди</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="protruinyky"
                            checked={selectedChemistryState === 'protruinyky'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Протруйники</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="desucanty"
                            checked={selectedChemistryState === 'desucanty'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Десиканти</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="adiuvanty"
                            checked={selectedChemistryState === 'adiuvanty'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Ад`юванти</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="dobryva"
                            checked={selectedChemistryState === 'dobryva'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Добрива</p>
                    </label>
                </div>
            </div>

            <div className={styles.dropdown}>
                <div className={styles.filterTitleWrapper} onClick={handleToggleTypeCheckboxes}>
                    <div className={styles.arrowWrapper}>
                        <img src={arrowDown} className={`${showTypeCheckboxes && styles.rotateImage}`} alt='arrow' />
                    </div>
                    <p className={styles.title}>Вид</p>
                </div>
                <div
                    className={`${styles.checkboxes} ${showTypeCheckboxes ? styles.show : ''}`}
                >
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="rozdrib"
                            className={styles.checkboxColor}
                            checked={selectedTypeState === 'rozdrib'}
                            onChange={handleTypeChange}
                        />
                        <p>Присадибне</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="gurt"
                            checked={selectedTypeState === 'gurt'}
                            onChange={handleTypeChange}
                        />
                        <p>Фермерське</p>
                    </label>
                </div>
            </div>
        </div>
    )
}

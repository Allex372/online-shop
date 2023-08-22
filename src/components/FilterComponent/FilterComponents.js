import React, { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterProvider';
import { useSideBar } from '../../context/SideBarProvider';

import filterIcon from '../../images/sort-icons/filter.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './FilterComponent.module.css';

export const FilterComponent = ({ cultureFilter, chemistryFilter, typeFilter }) => {
    const resultFilterContext = useFilter();
    const { changeCultureFilter, changeChemistryFilter, changeTypeFilter } = resultFilterContext ? resultFilterContext : {};

    const sideBarContext = useSideBar();
    const { handleSideBar } = sideBarContext ? sideBarContext : {};

    const [showTypeCheckboxes, setShowTypeCheckboxes] = useState(false);
    const [showChemistryCheckboxes, setShowChemistryCheckboxes] = useState(false);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedTypeState, setTypeCheckboxState] = useState('');
    const [selectedChemistryState, setCheckboxChemistryState] = useState('');
    const [showCultureButton, setShowCultureButton] = useState(false);
    const [showChemistryButton, setShowChemistryButton] = useState(false);
    const [showTypeButton, setShowTypeButton] = useState(false);

    useEffect(() => {
        cultureFilter && setShowCultureButton(true);
        chemistryFilter && setShowChemistryButton(true);
        typeFilter && setShowTypeButton(true);
    }, [cultureFilter, chemistryFilter, typeFilter]);

    const handleToggleCheckboxes = () => {
        setShowCheckboxes((prevState) => !prevState);
    };

    const handleCropChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCrop(checked ? name : '');
        changeCultureFilter(name);
    };

    const handleToggleChemistryChange = () => {
        setShowChemistryCheckboxes((prevState) => !prevState);
    };

    const handleTypeChemistryChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxChemistryState(checked ? name : '');
        changeChemistryFilter(name);
    };

    const handleToggleTypeCheckboxes = () => {
        setShowTypeCheckboxes((prevState) => !prevState);
    };

    const handleTypeChange = (event) => {
        const { name, checked } = event.target;
        setTypeCheckboxState(checked ? name : '');
        changeTypeFilter(name);
    };

    const handleResetCulture = () => {
        setSelectedCrop('');
        changeCultureFilter(null);
    }

    const handleResetChemistry = () => {
        setCheckboxChemistryState('');
        changeChemistryFilter(null);
    }

    const handleResetType = () => {
        setTypeCheckboxState('');
        changeTypeFilter(null);
    }

    useEffect(() => {
        cultureFilter && handleToggleCheckboxes();
        chemistryFilter && handleToggleChemistryChange();
        typeFilter && handleToggleTypeCheckboxes();
    }, []);

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
                            name="пшениця"
                            className={styles.checkboxColor}
                            checked={selectedCrop === 'пшениця' || cultureFilter === 'пшениця'}
                            onChange={handleCropChange}
                        />
                        <p>Пшениця</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="соняшник"
                            checked={selectedCrop === 'соняшник' || cultureFilter === 'соняшник'}
                            onChange={handleCropChange}
                        />
                        <p>Соняшник</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="соя"
                            checked={selectedCrop === 'соя' || cultureFilter === 'соя'}
                            onChange={handleCropChange}
                        />
                        <p>Соя</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="яблуко"
                            checked={selectedCrop === 'яблуко' || cultureFilter === 'яблуко'}
                            onChange={handleCropChange}
                        />
                        <p>Яблуко</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="ріпак"
                            checked={selectedCrop === 'ріпак' || cultureFilter === 'ріпак'}
                            onChange={handleCropChange}
                        />
                        <p>Ріпак</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="помідори"
                            checked={selectedCrop === 'помідори' || cultureFilter === 'помідори'}
                            onChange={handleCropChange}
                        />
                        <p>Помідори</p>
                    </label>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.resetButton} onClick={() => handleResetCulture()}>Скинути</button>
                        {showCultureButton && <button className={`${styles.resetButton} ${styles.showButton}`} onClick={() => handleSideBar()}>Показати</button>}
                    </div>
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
                            name="гербіциди"
                            className={styles.checkboxColor}
                            checked={selectedChemistryState === 'гербіциди' || chemistryFilter === 'гербіциди'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Гербіциди</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="фунгіциди"
                            checked={selectedChemistryState === 'фунгіциди' || chemistryFilter === 'фунгіциди'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Фунгіциди</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="інсектециди"
                            checked={selectedChemistryState === 'інсектециди' || chemistryFilter === 'інсектециди'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Інсектециди</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="протруйники"
                            checked={selectedChemistryState === 'протруйники' || chemistryFilter === 'протруйники'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Протруйники</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="десиканти"
                            checked={selectedChemistryState === 'десиканти' || chemistryFilter === 'десиканти'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Десиканти</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="ад'юванти"
                            checked={selectedChemistryState === "ад'юванти" || chemistryFilter === "ад'юванти"}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Ад`юванти</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="добрива"
                            checked={selectedChemistryState === 'добрива' || chemistryFilter === 'добрива'}
                            onChange={handleTypeChemistryChange}
                        />
                        <p>Добрива</p>
                    </label>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.resetButton} onClick={() => handleResetChemistry()}>Скинути</button>
                        {showChemistryButton && <button className={`${styles.resetButton} ${styles.showButton}`} onClick={() => handleSideBar()}>Показати</button>}
                    </div>
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
                            name="присадибне"
                            className={styles.checkboxColor}
                            checked={selectedTypeState === 'присадибне' || typeFilter === 'присадибне'}
                            onChange={handleTypeChange}
                        />
                        <p>Присадибне</p>
                    </label>
                    <label className={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            name="фермерське"
                            checked={selectedTypeState === 'фермерське' || typeFilter === 'фермерське'}
                            onChange={handleTypeChange}
                        />
                        <p>Фермерське</p>
                    </label>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.resetButton} onClick={() => handleResetType()}>Скинути</button>
                        {showTypeButton && <button className={`${styles.resetButton} ${styles.showButton}`} onClick={() => handleSideBar()}>Показати</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterProvider';

import filterIcon from '../../images/sort-icons/filter.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './FilterComponent.module.css';

export const FilterComponent = ({ cultureFilter, chemistryFilter, typeFilter, result }) => {
    const resultFilterContext = useFilter();
    const { changeCultureFilter, changeChemistryFilter, changeTypeFilter, handleOpenFilterModal, cultureFilter: culture, chemistryFilter: chemistry, typeFilter: type } = resultFilterContext ? resultFilterContext : {};

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
        if (checked) {
            setSelectedCrop(checked ? name : '');
            changeCultureFilter(name);
        }
        else {
            setSelectedCrop('');
            changeCultureFilter(null);
        }
    };

    const handleToggleChemistryChange = () => {
        setShowChemistryCheckboxes((prevState) => !prevState);
    };

    const handleTypeChemistryChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setCheckboxChemistryState(checked ? name : '');
            changeChemistryFilter(name);
        } else {
            setCheckboxChemistryState('');
            changeChemistryFilter(null);
        }
    };

    const handleToggleTypeCheckboxes = () => {
        setShowTypeCheckboxes((prevState) => !prevState);
    };

    const handleTypeChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setTypeCheckboxState(checked ? name : '');
            changeTypeFilter(name);
        } else {
            setTypeCheckboxState('');
            changeTypeFilter(null);
        }
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

    const handleResetAll = () => {
        handleResetCulture();
        handleResetChemistry();
        handleResetType();
        handleOpenFilterModal(false);
    }

    useEffect(() => {
        (cultureFilter || culture) && handleToggleCheckboxes();
        (chemistryFilter || chemistry) && handleToggleChemistryChange();
        (typeFilter || type) && handleToggleTypeCheckboxes();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleWrapper}>
                    <div className={styles.topWrapper} onClick={() => handleOpenFilterModal(false)}>
                        <img src={arrowDown} className={styles.arrowBack} alt='arrow' />

                        <div className={styles.filterIconWrapper}>
                            <img src={filterIcon} alt='filter' />
                        </div>

                        <p className={styles.filterText}>Фільтри</p>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button className={styles.resetButton} onClick={() => handleResetAll()}>Скасувати все</button>
                    </div>
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
                                name="зернові (пшениця, ячмінь)"
                                className={styles.checkboxColor}
                                checked={selectedCrop == 'зернові (пшениця, ячмінь)' || cultureFilter == 'зернові (пшениця, ячмінь)' || culture == 'зернові (пшениця, ячмінь)'}
                                onChange={handleCropChange}
                            />
                            <p>Зернові (пшениця, ячмінь)</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="соняшник"
                                checked={selectedCrop === 'соняшник' || cultureFilter === 'соняшник' || culture === 'соняшник'}
                                onChange={handleCropChange}
                            />
                            <p>Соняшник</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="соя"
                                checked={selectedCrop == 'соя' || cultureFilter == 'соя' || culture == 'соя'}
                                onChange={handleCropChange}
                            />
                            <p>Соя</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="cади, ягоди"
                                checked={selectedCrop == 'cади, ягоди' || cultureFilter == 'cади, ягоди' || culture == 'cади, ягоди'}
                                onChange={handleCropChange}
                            />
                            <p>Сади, ягоди</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="ріпак"
                                checked={selectedCrop == 'ріпак' || cultureFilter == 'ріпак' || culture == 'ріпак'}
                                onChange={handleCropChange}
                            />
                            <p>Ріпак</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="овочі"
                                checked={selectedCrop == 'овочі' || cultureFilter == 'овочі' || culture == 'овочі'}
                                onChange={handleCropChange}
                            />
                            <p>Овочі</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="картопля"
                                checked={selectedCrop == 'картопля' || cultureFilter == 'картопля' || culture == 'картопля'}
                                onChange={handleCropChange}
                            />
                            <p>Картопля</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="кукурудза"
                                checked={selectedCrop == 'кукурудза' || cultureFilter == 'кукурудза' || culture == 'кукурудза'}
                                onChange={handleCropChange}
                            />
                            <p>Кукурудза</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="буряки цукрові"
                                checked={selectedCrop == 'буряки цукрові' || cultureFilter == 'буряки цукрові' || culture == 'буряки цукрові'}
                                onChange={handleCropChange}
                            />
                            <p>Буряки цукрові</p>
                        </label>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.resetButton} onClick={() => handleResetCulture()}>Скинути</button>
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
                                checked={selectedChemistryState === 'гербіциди' || chemistryFilter === 'гербіциди' || chemistry?.toLowerCase() === 'гербіциди'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Гербіциди</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="фунгіциди"
                                checked={selectedChemistryState === 'фунгіциди' || chemistryFilter === 'фунгіциди' || chemistry?.toLowerCase() === 'фунгіциди'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Фунгіциди</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="інсектециди"
                                checked={selectedChemistryState === 'інсектециди' || chemistryFilter === 'інсектециди' || chemistry?.toLowerCase() === 'інсектециди'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Інсектециди</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="протруйники"
                                checked={selectedChemistryState === 'протруйники' || chemistryFilter === 'протруйники' || chemistry?.toLowerCase() === 'протруйники'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Протруйники</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="десиканти"
                                checked={selectedChemistryState === 'десиканти' || chemistryFilter === 'десиканти' || chemistry?.toLowerCase() === 'десиканти'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Десиканти</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="Прилипачі (ад'юванти)"
                                checked={selectedChemistryState === "Прилипачі (ад'юванти)" || chemistryFilter === "Прилипачі (ад'юванти)" || chemistry?.toLowerCase() === "Прилипачі (ад'юванти)"}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Прилипачі (ад'юванти)</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="добрива"
                                checked={selectedChemistryState === 'добрива' || chemistryFilter === 'добрива' || chemistry?.toLowerCase() === 'добрива'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Добрива</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="Стимулятори росту, мікродобрива"
                                checked={selectedChemistryState === 'Стимулятори росту, мікродобрива' || chemistryFilter === 'Стимулятори росту, мікродобрива' || chemistry === 'Стимулятори росту, мікродобрива'}
                                onChange={handleTypeChemistryChange}
                            />
                            <p>Стимулятори росту, мікродобрива</p>
                        </label>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.resetButton} onClick={() => handleResetChemistry()}>Скинути</button>
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
                                checked={selectedTypeState === 'присадибне' || typeFilter === 'присадибне' || type === 'присадибне'}
                                onChange={handleTypeChange}
                            />
                            <p>Присадибне</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="фермерське"
                                checked={selectedTypeState === 'фермерське' || typeFilter === 'фермерське' || type === 'фермерське'}
                                onChange={handleTypeChange}
                            />
                            <p>Фермерське</p>
                        </label>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.resetButton} onClick={() => handleResetType()}>Скинути</button>
                        </div>
                    </div>
                </div>


            </div>
            <div className={styles.showResultWrapper}>
                <p>Знайдено: {result} товари</p>
                <button onClick={() => handleOpenFilterModal(false)} className={`${styles.resetButton} ${styles.showButton}`}>Показати</button>
            </div>
        </>
    )
}

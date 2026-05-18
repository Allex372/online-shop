import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useFilter } from '../../features/catalog';

import filterIcon from '../../images/sort-icons/filter.svg';
import arrowDown from '../../images/sort-icons/arrow-down.svg';

import * as styles from './FilterComponent.module.css';

export const FilterComponent = ({
    cultureFilter,
    chemistryFilter,
    typeFilter,
    result,
    categoryPageSlug = null,
}) => {
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
        const { name, checked, value } = event.target;

        if (categoryPageSlug) {
            const nextValue = value || name;
            setCheckboxChemistryState(nextValue);
            changeChemistryFilter(nextValue);
            return;
        }

        if (checked) {
            setCheckboxChemistryState(name);
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
        if (categoryPageSlug) {
            navigate('/products/');
        }
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
        if (cultureFilter || culture) setShowCheckboxes(true);
        if (chemistryFilter || chemistry) setShowChemistryCheckboxes(true);
        if (typeFilter || type) setShowTypeCheckboxes(true);
    }, [cultureFilter, culture, chemistryFilter, chemistry, typeFilter, type]);

    return (
        <>
            <div className={styles.container}>

                <div className={`${cultureFilter || chemistryFilter || typeFilter ? styles.buttonResetAllWrapper : styles.displayNone}`}>
                    <button className={styles.resetButton} onClick={() => handleResetAll()}>Скасувати всі фільтри</button>
                </div>


                <div className={styles.titleWrapper}>
                    <div
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                console.log(e);
                            }
                        }}
                        role="button"
                        tabIndex="0"
                        className={styles.topWrapper}
                        onClick={() => handleOpenFilterModal(false)}>
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
                                checked={selectedCrop === 'зернові (пшениця, ячмінь)' || cultureFilter === 'зернові (пшениця, ячмінь)' || culture === 'зернові (пшениця, ячмінь)'}
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
                                checked={selectedCrop === 'соя' || cultureFilter === 'соя' || culture === 'соя'}
                                onChange={handleCropChange}
                            />
                            <p>Соя</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="сади, ягоди"
                                checked={selectedCrop === 'сади, ягоди' || cultureFilter === 'сади, ягоди' || culture === 'сади, ягоди'}
                                onChange={handleCropChange}
                            />
                            <p>Сади, ягоди</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="ріпак"
                                checked={selectedCrop === 'ріпак' || cultureFilter === 'ріпак' || culture === 'ріпак'}
                                onChange={handleCropChange}
                            />
                            <p>Ріпак</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="овочі"
                                checked={selectedCrop === 'овочі' || cultureFilter === 'овочі' || culture === 'овочі'}
                                onChange={handleCropChange}
                            />
                            <p>Овочі</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="картопля"
                                checked={selectedCrop === 'картопля' || cultureFilter === 'картопля' || culture === 'картопля'}
                                onChange={handleCropChange}
                            />
                            <p>Картопля</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="кукурудза"
                                checked={selectedCrop === 'кукурудза' || cultureFilter === 'кукурудза' || culture === 'кукурудза'}
                                onChange={handleCropChange}
                            />
                            <p>Кукурудза</p>
                        </label>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="буряки цукрові"
                                checked={selectedCrop === 'буряки цукрові' || cultureFilter === 'буряки цукрові' || culture === 'буряки цукрові'}
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
                        <p className={styles.title}>
                            {categoryPageSlug ? 'Категорія' : 'Тип продукту'}
                        </p>
                    </div>
                    <div
                        className={`${styles.checkboxes} ${showChemistryCheckboxes ? styles.show : ''} ${categoryPageSlug ? styles.categoryPanel : ''}`}
                    >
                        {categoryPageSlug && (
                            <p className={styles.categoryHint}>
                                Оберіть іншу категорію — відкриється відповідний розділ каталогу.
                            </p>
                        )}
                        {[
                            { value: 'гербіциди', label: 'Гербіциди' },
                            { value: 'фунгіциди', label: 'Фунгіциди' },
                            { value: 'інсектициди', label: 'Інсектициди' },
                            { value: 'протруйники', label: 'Протруйники' },
                            { value: 'десиканти', label: 'Десиканти' },
                            { value: "Прилипачі (ад'юванти)", label: "Прилипачі (ад'юванти)" },
                            { value: 'добрива', label: 'Добрива' },
                            { value: 'Стимулятори росту, мікродобрива', label: 'Стимулятори росту, мікродобрива' },
                        ].map(({ value, label }) => {
                            const normalizedValue = value.toLowerCase();
                            const isChecked =
                                selectedChemistryState?.toLowerCase() === normalizedValue ||
                                chemistryFilter?.toLowerCase() === normalizedValue ||
                                chemistry?.toLowerCase() === normalizedValue;

                            return (
                                <label
                                    key={value}
                                    className={`${styles.checkboxWrapper} ${categoryPageSlug ? styles.categoryOption : ''} ${categoryPageSlug && isChecked ? styles.categoryOptionActive : ''}`}
                                >
                                    <input
                                        type={categoryPageSlug ? 'radio' : 'checkbox'}
                                        name={categoryPageSlug ? 'category-chemistry' : value}
                                        value={value}
                                        checked={isChecked}
                                        onChange={handleTypeChemistryChange}
                                    />
                                    <span className={styles.optionLabel}>{label}</span>
                                </label>
                            );
                        })}

                        <div className={`${styles.buttonWrapper} ${categoryPageSlug ? styles.categoryActions : ''}`}>
                            <button
                                type="button"
                                className={`${styles.resetButton} ${categoryPageSlug ? styles.categoryCatalogLink : ''}`}
                                onClick={() => handleResetChemistry()}
                            >
                                {categoryPageSlug ? 'Увесь каталог' : 'Скинути'}
                            </button>
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

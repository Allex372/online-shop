import React from 'react';
import { useResult } from '../../context/SearchResultProvider';
// import { StaticImage } from 'gatsby-plugin-image';
import { useView } from '../../context/ViewProvider';

import * as styles from './ProductHeaderFilters.module.css';

import searchIcon from '../../images/search.svg';
import close from '../../images/close.png';
import grid from '../../images/views/grid.svg';
import list from '../../images/views/list.svg';

export const ProductHeaderFilters = ({ result }) => {
    const viewContext = useView();
    const { viewOptions, changeGridView } = viewContext ? viewContext : {};

    const resultContext = useResult();
    const { changeSearchResult, searchResult } = resultContext ? resultContext : {};

    const handleSearch = (e) => {
        changeSearchResult(e.target.value);
    }

    const handleClearSearch = () => {
        changeSearchResult('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.resultBlock}>
                <p>Знайдено: {result}</p>
            </div>
            <div className={styles.searchContainer}>
                <div>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Шукати"
                        onChange={(e) => handleSearch(e)}
                        value={searchResult}
                    />
                </div>
                <img
                    src={searchIcon}
                    className={styles.searchIcon}
                    alt="Search Icon"
                />
            </div>
            <div className={styles.rightWrapper}>
                <div className={`${searchResult?.length ? styles.helperDiv : styles.dNone}`}>
                    <p>{searchResult}</p>
                    <img src={close} alt='Close' className={styles.closeImg} onClick={() => handleClearSearch()} />
                </div>
                <div className={styles.iconViewWrapper}>
                    <img className={styles.viewIconActive} onClick={() => changeGridView('grid')} alt="row" src={grid} />
                    <img className={styles.viewIconActive} onClick={() => changeGridView('list')} alt="table" src={list} />
                </div>
            </div>

        </div>
    );
};

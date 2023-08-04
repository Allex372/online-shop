import React, { useState, useEffect } from "react"
import Seo from "../components/Seo/seo"
import { Layout, ProductHeaderFilters, ProductsLayout, FilterComponent, SortComponent, Backet } from '../components';
import { useResult } from "../context/SearchResultProvider";

import * as styles from '../components/products.module.css';

import big from '../images/bigBotltle.png';
import small from '../images/smallBottle.png';
import arrow from '../images/sort-icons/arrow-down.svg';


const ProductsArray = [
    {
        id: 1,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: big,
        price: 200,
    },
    {
        id: 2,
        name: 'МЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        activeIng: 'test',
        img: big,
        price: 300,
    },
    {
        id: 3,
        name: 'МЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        img: big,
        price: 400,
    },
    {
        id: 4,
        name: 'МЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        img: small,
        price: 500,
    },
    {
        id: 5,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 600,
    },
    {
        id: 6,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 700,
    },
    {
        id: 7,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 800,
    },
    {
        id: 8,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 900,
    },
    {
        id: 9,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 100,
    },
    {
        id: 10,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 1000,
    },
    {
        id: 11,
        name: 'МЕДЯН ЕКСТРА Фунгіцид',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 1100,
    },
    {
        id: 12,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 1200,
    },
    {
        id: 13,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple', 'rapeseed'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 1300,
    },
    {
        id: 14,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'soyabean'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
        price: 1400,
    },
];

const ProductsPage = ({ pageContext }) => {
    const resultContext = useResult();
    const { searchResult } = resultContext ? resultContext : {};

    const { filter } = pageContext;

    const filteredElements = ProductsArray.filter((el) => {
        if (el.chemistry === filter) {
            return el;
        } else if (el.size === filter) {
            return el;
        } else if (el.culture.includes(filter)) {
            return true;
        }
        return false;
    });

    const searchedElements = searchResult
        ? filteredElements.filter((el) =>
            el.name.toLowerCase().includes(searchResult.toLowerCase()) ||
            el.description.toLowerCase().includes(searchResult.toLowerCase()) ||
            el.culture.some((culture) => culture.toLowerCase().includes(searchResult.toLowerCase())) ||
            el.chemistry.toLowerCase().includes(searchResult.toLowerCase()) ||
            el.size.toLowerCase().includes(searchResult.toLowerCase())
        )
        : filteredElements;

    // Параметри пагінації
    const itemsPerPage = 6; // Кількість елементів на одній сторінці
    const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка

    // Обчислюємо загальну кількість сторінок на основі кількості елементів і кількості елементів на сторінці
    const totalPages = Math.ceil(searchedElements.length / itemsPerPage);

    // Функція для зміни поточної сторінки
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Функція для отримання списку сторінок для відображення в пагінації
    const getDisplayedPages = () => {
        const maxDisplayedPages = 3; // Максимальна кількість сторінок, які відображаються
        const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
        const displayedPages = [];

        let startPage = Math.max(1, currentPage - halfDisplayedPages);
        let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

        if (endPage - startPage < maxDisplayedPages - 1) {
            startPage = Math.max(1, endPage - maxDisplayedPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            displayedPages.push(i);
        }

        return displayedPages;
    };

    return (
        <Layout>
            <Backet />
            <div className={styles.wrapper}>
                <ProductHeaderFilters result={searchedElements.length} />
                <div className={styles.flexColumnWrapper}>
                    <div className={styles.mainWrapper}>
                        <div className={styles.filterWrapper}><FilterComponent /></div>

                        <ProductsLayout array={searchedElements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />
                        <div className={styles.filterWrapper}><SortComponent /></div>
                    </div>
                    {/* Пагінація */}
                    <div className={styles.paginationWrapper}>
                        {currentPage > 1 && (
                            <div onClick={() => handlePageChange(currentPage - 1)} className={styles.paginationButton}>
                                <img src={arrow} alt='arrow' />
                            </div>
                        )}
                        {getDisplayedPages().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(page)}
                                className={`${styles.paginationButton} ${page === currentPage ? styles.active : ''}`}
                            >
                                {page}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <div onClick={() => handlePageChange(currentPage + 1)} className={styles.paginationButton}>
                                <img src={arrow} alt='arrow' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Products" />

export default ProductsPage

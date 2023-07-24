import React, { useState, useEffect } from "react"
import Seo from "../components/Seo/seo"
import { Layout, ProductHeaderFilters, ProductsLayout, FilterComponent, SortComponent } from '../components';
import { useResult } from "../context/SearchResultProvider";

import * as styles from '../components/products.module.css';

import big from '../images/bigBotltle.png';
import small from '../images/smallBottle.png';
import arrow from '../images/sort-icons/arrow-down.svg';


const ProductsArray = [
    {
        id: 1,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: big,
    },
    {
        id: 2,
        name: 'МЕДЯН ЕКСТРА TURBO',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        img: big,
    },
    {
        id: 3,
        name: 'МЕДЯН ЕКСТРА TURBO',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        img: big,
    },
    {
        id: 4,
        name: 'МЕДЯН ЕКСТРА TURBO',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        img: small,
    },
    {
        id: 5,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 6,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 7,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 8,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 9,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 10,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 11,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 12,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 13,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
    {
        id: 14,
        name: 'МЕДЯН ЕКСТРА',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        img: small,
    },
];

const ProductsPage = ({ pageContext }) => {
    const { changeSearchResult } = useResult();
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

    useEffect(() => { changeSearchResult(filteredElements.length); }, [filteredElements]);

    // Параметри пагінації
    const itemsPerPage = 6; // Кількість елементів на одній сторінці
    const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка

    // Обчислюємо загальну кількість сторінок на основі кількості елементів і кількості елементів на сторінці
    const totalPages = Math.ceil(filteredElements.length / itemsPerPage);

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
            <div className={styles.wrapper}>
                <ProductHeaderFilters />
                <div className={styles.flexColumnWrapper}>
                    <div className={styles.mainWrapper}>
                        <FilterComponent />
                        <ProductsLayout array={filteredElements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />
                        <SortComponent />
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

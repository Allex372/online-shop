import React, { useState, useEffect } from "react";
import Seo from "../components/Seo/seo";
import { Layout, ProductHeaderFilters, ProductsLayout, FilterComponent, SortComponent, Backet } from '../components';
import { useResult } from "../context/SearchResultProvider";
import { useFilter } from "../context/FilterProvider";
import { useView } from "../context/ViewProvider";

import * as styles from '../components/products.module.css';

import big from '../images/bigBotltle.png';
import small from '../images/smallBottle.png';
import arrow from '../images/sort-icons/arrow-down.svg';


const ProductsArray = [
    {
        id: 1,
        name: 'АЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'фермерське',
        img: big,
        price: 200,
        isAvailable: true,
    },
    {
        id: 2,
        name: 'БЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['соняшник', 'соя'],
        chemistry: 'гербіциди',
        size: 'фермерське',
        activeIng: 'test',
        img: big,
        price: 300,
        isAvailable: true,
    },
    {
        id: 3,
        name: 'ВЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['соняшник', 'соя'],
        chemistry: 'гербіциди',
        size: 'фермерське',
        img: big,
        price: 400,
        isAvailable: true,
    },
    {
        id: 4,
        name: 'ГЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['соняшник', 'соя'],
        chemistry: 'гербіциди',
        size: 'фермерське',
        img: small,
        price: 500,
        isAvailable: true,
    },
    {
        id: 5,
        name: 'ДЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'гербіциди',
        size: 'присадибне',
        img: small,
        price: 600,
        isAvailable: true,
    },
    {
        id: 6,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 700,
        isAvailable: true,
    },
    {
        id: 7,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 800,
        isAvailable: false,
    },
    {
        id: 8,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 900,
        isAvailable: false,
    },
    {
        id: 9,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 100,
        isAvailable: false,
    },
    {
        id: 10,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 1000,
        isAvailable: false,
    },
    {
        id: 11,
        name: 'МЕДЯН ЕКСТРА Фунгіцид',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 1100,
        isAvailable: false,
    },
    {
        id: 12,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 1200,
        isAvailable: false,
    },
    {
        id: 13,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'яблуко', 'ріпак'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 1300,
        isAvailable: false,
    },
    {
        id: 14,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['помідори', 'соя'],
        chemistry: 'фунгіциди',
        size: 'присадибне',
        img: small,
        price: 1400,
        isAvailable: true,
    },
];

const ProductsPage = () => {
    const viewContext = useView();
    const { viewOptions } = viewContext ? viewContext : {};

    const resultFilterContext = useFilter();
    const { cultureFilter, chemistryFilter, typeFilter, sortOptions } = resultFilterContext ? resultFilterContext : {};

    const resultContext = useResult();
    const { searchResult } = resultContext ? resultContext : {};

    const filteredElements = ProductsArray.filter((el) => {
        const isChemistryMatch = !chemistryFilter || el?.chemistry === chemistryFilter.toLowerCase();
        const isTypeMatch = !typeFilter || el?.size === typeFilter;
        const isCultureMatch = !cultureFilter || el?.culture.includes(cultureFilter);
        const idAvailable = !sortOptions?.availability || el?.isAvailable === sortOptions?.availability;

        return isChemistryMatch && isTypeMatch && isCultureMatch && idAvailable;
    });

    const sortedElement = [...filteredElements]; // Створюємо копію масиву для сортування

    if (sortOptions?.alphabet) {
        sortedElement.sort((a, b) => a.name.localeCompare(b.name)); // Сортування за назвою в алфавітному порядку
    } else if (sortOptions?.reverseAlphabet) {
        sortedElement.sort((a, b) => b.name.localeCompare(a.name)); // Сортування за назвою в зворотньому алфавітному порядку
    } else if (sortOptions?.priceHighToLow) {
        sortedElement.sort((a, b) => b.price - a.price); // Сортування за ціною від вищої до нижчої
    } else if (sortOptions?.priceLowToHigh) {
        sortedElement.sort((a, b) => a.price - b.price); // Сортування за ціною від нижчої до вищої
    }

    const searchedElements = searchResult
        ? sortedElement.filter((el) =>
            el.name.toLowerCase().includes(searchResult.toLowerCase()) ||
            el.description.toLowerCase().includes(searchResult.toLowerCase()) ||
            el.culture.some((culture) => culture.toLowerCase().includes(searchResult.toLowerCase())) ||
            el.chemistry.toLowerCase().includes(searchResult.toLowerCase()) ||
            el.size.toLowerCase().includes(searchResult.toLowerCase())
        )
        : sortedElement;

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

    useEffect(() => {
        if ((cultureFilter || chemistryFilter || typeFilter || sortOptions?.availability || searchResult) && currentPage !== 1) {
            handlePageChange(1);
        };
    }, [cultureFilter, chemistryFilter, typeFilter, sortOptions, searchResult]);

    return (
        <Layout>
            <Backet />
            <div className={styles.wrapper}>
                <ProductHeaderFilters result={searchedElements.length} />
                <div className={styles.flexColumnWrapper}>
                    <div className={styles.mainWrapper}>
                        <div className={styles.filterWrapper}>
                            <FilterComponent chemistryFilter={chemistryFilter?.toLowerCase()} cultureFilter={cultureFilter?.toLowerCase()} typeFilter={typeFilter?.toLowerCase()} />
                        </div>

                        <ProductsLayout array={searchedElements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} viewStyle={viewOptions} />
                        <div className={styles.filterWrapper}>
                            <SortComponent />
                        </div>
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

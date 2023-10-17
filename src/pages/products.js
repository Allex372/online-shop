import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Seo from "../components/Seo/seo";
import { Layout, ProductHeaderFilters, ProductsLayout, FilterComponent, Backet, Footer } from '../components';
import { FiltersModal } from "../components/FiltersModal";
import { useResult } from "../context/SearchResultProvider";
import { useFilter } from "../context/FilterProvider";
import { useView } from "../context/ViewProvider";

import * as styles from '../components/products.module.css';

import arrow from '../images/sort-icons/arrow-down.svg';

const ProductsPage = () => {
    const viewContext = useView();
    const { viewOptions } = viewContext ? viewContext : {};

    const resultFilterContext = useFilter();
    const { cultureFilter, chemistryFilter, typeFilter, sortOptions, openFilterModal } = resultFilterContext ? resultFilterContext : {};

    const resultContext = useResult();
    const { searchResult } = resultContext ? resultContext : {};

    const data = useStaticQuery(graphql`
        query {
            rest {
                products(pagination: {limit: 1000}) {
                    data {
                        id
                        attributes {
                            cultures {
                                    data {
                                        attributes {
                                                name
                                    }
                                }
                            }
                            Active_substance
                            url
                            name
                            chemistries{
                                    data {
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            createdAt
                            updatedAt
                            description
                            isAvailable
                            price
                            showProduct
                            sizes{
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                            img {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const Products = data?.rest?.products?.data;

    const filteredElements = Products?.filter((el) => {
        const isChemistryMatch = !chemistryFilter || el?.attributes?.chemistries?.data?.[0]?.attributes?.name.toLowerCase() === chemistryFilter.toLowerCase();
        const isTypeMatch = !typeFilter || el?.attributes?.sizes?.data?.[0]?.attributes?.name === typeFilter;
        const isCultureMatch = !cultureFilter || el?.attributes?.cultures?.data.some(culture => culture?.attributes?.name?.toLocaleLowerCase().trim().includes(cultureFilter?.toLocaleLowerCase()));

        return isChemistryMatch && isTypeMatch && isCultureMatch;
    });

    const searchedElements = searchResult
        ? filteredElements.filter((el) =>
            el?.attributes?.name?.toLowerCase().includes(searchResult?.toLowerCase()) ||
            el?.attributes?.Active_substance?.toLowerCase().includes(searchResult?.toLowerCase()) ||
            el?.attributes?.description?.toLowerCase().includes(searchResult?.toLowerCase()) ||
            el?.attributes?.cultures?.data?.some(culture => culture?.attributes?.name.toLowerCase().includes(searchResult?.toLowerCase())) ||
            el?.attributes?.chemistries?.data?.some(culture => culture?.attributes?.name.toLowerCase().includes(searchResult?.toLowerCase())) ||
            el?.attributes?.sizes?.data?.some(culture => culture?.attributes?.name.toLowerCase().includes(searchResult?.toLowerCase()))
        )
        : filteredElements;

    searchedElements.sort((a, b) => {
        const isAvailableA = a?.attributes?.isAvailable || false;
        const isAvailableB = b?.attributes?.isAvailable || false;

        if (isAvailableA && !isAvailableB) {
            return -1;
        } else if (!isAvailableA && isAvailableB) {
            return 1;
        }
        return 0;
    });

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
        <>
            <Layout>
                <Backet />
                <FiltersModal isOpen={openFilterModal} result={searchedElements?.length} />
                <div className={styles.wrapper}>
                    <ProductHeaderFilters result={searchedElements.length} />
                    <div className={styles.flexColumnWrapper}>
                        <div className={styles.mainWrapper}>
                            <div className={styles.filterWrapper}>
                                <FilterComponent chemistryFilter={chemistryFilter?.toLowerCase()} cultureFilter={cultureFilter?.toLowerCase()} typeFilter={typeFilter?.toLowerCase()} resultLength={searchedElements.length} />
                            </div>

                            <ProductsLayout array={searchedElements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} viewStyle={viewOptions} />
                            <div className={styles.sortWrapper}>
                                {/* <SortComponent /> */}
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
            <Footer />
        </>
    )
}

export const Head = () => <Seo title="Products" />

export default ProductsPage

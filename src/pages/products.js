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
                            highPriority
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
        ? filteredElements
            .filter((el) =>
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

    const getSortedElements = () => {
        let sortedElements = [...searchedElements];

        sortedElements.sort((a, b) => {
            const isAvailableA = a?.attributes?.isAvailable || false;
            const isAvailableB = b?.attributes?.isAvailable || false;

            if (isAvailableA && !isAvailableB) {
                return -1;
            } else if (!isAvailableA && isAvailableB) {
                return 1;
            }

            return a.attributes.name.localeCompare(b.attributes.name);
        });

        const highPriorityElements = sortedElements.filter(el => el?.attributes?.highPriority === true);
        const nonHighPriorityElements = sortedElements.filter(el => el?.attributes?.highPriority !== true);

        sortedElements = [...highPriorityElements, ...nonHighPriorityElements];

        return sortedElements;
    };


    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const storedPosition = localStorage.getItem('scrollPosition');
        if (storedPosition) {
            window.scrollTo(0, +storedPosition);
        }
    }, []);

    const handleScroll = () => {
        const position = window.scrollY || window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('scrollPosition', scrollPosition.toString());
    }, [scrollPosition]);

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

                            <ProductsLayout array={getSortedElements()} viewStyle={viewOptions} />
                            <div className={styles.sortWrapper}>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            {/* <Footer /> */}
        </>
    )
}

export const Head = () => <Seo title="Вікторія Захід Трейд  | Товари" />

export default ProductsPage

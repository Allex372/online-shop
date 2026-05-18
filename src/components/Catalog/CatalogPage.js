import React, { useState, useEffect, useMemo } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';
import { getCategoryByFilterValue, getCategoryPath } from '../../lib/chemistryCategories';
import { Layout, ProductsLayout, FilterComponent, Backet, ChemistryElements } from '../index';
import { CatalogToolbar } from './CatalogToolbar';
import { CategoryIntro } from './CategoryIntro';
import { ConsultationBanner } from '../shared/ConsultationBanner';
import { FiltersModal } from '../FiltersModal';
import { useResult, useFilter, useView } from '../../features/catalog';
import { useCurrencyRate } from '../../hooks/useCurrencyRate';
import { sortCatalogProducts } from '../../lib/sortCatalogProducts';
import '../StrapiImage/StrapiImage';
import * as styles from '../products.module.css';

export const CatalogPage = ({ category = null }) => {
  const { viewOptions } = useView() || {};
  const {
    cultureFilter,
    chemistryFilter,
    typeFilter,
    openFilterModal,
    sortOptions,
    changeChemistryFilter,
  } = useFilter() || {};
  const { searchResult } = useResult() || {};
  const currencyRate = useCurrencyRate();

  const data = useStaticQuery(graphql`
    query CatalogProducts {
      rest {
        products(pagination: { limit: 1000 }) {
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
              chemistries {
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
              sizes {
                data {
                  attributes {
                    name
                  }
                }
              }
              img {
                data {
                  attributes {
                    ...StrapiUploadFile
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const products = data?.rest?.products?.data;

  // Синхронізуємо фільтр лише при вході на сторінку категорії (за slug)
  useEffect(() => {
    if (category?.filterValue) {
      changeChemistryFilter?.(category.filterValue);
    }
  }, [category?.slug, category?.filterValue, changeChemistryFilter]);

  // На сторінці категорії вибір іншої категорії в сайдбарі → перехід на відповідний URL
  useEffect(() => {
    if (!category || !chemistryFilter) return undefined;

    const targetCategory = getCategoryByFilterValue(chemistryFilter);
    if (targetCategory && targetCategory.slug !== category.slug) {
      navigate(getCategoryPath(targetCategory.slug));
    }

    return undefined;
  }, [chemistryFilter, category]);

  const activeChemistryFilter = chemistryFilter ?? category?.filterValue;

  const filteredElements = useMemo(
    () =>
      products?.filter((el) => {
        const isChemistryMatch =
          !activeChemistryFilter ||
          el?.attributes?.chemistries?.data?.[0]?.attributes?.name.toLowerCase() ===
            activeChemistryFilter.toLowerCase();
        const isTypeMatch =
          !typeFilter || el?.attributes?.sizes?.data?.[0]?.attributes?.name === typeFilter;
        const isCultureMatch =
          !cultureFilter ||
          el?.attributes?.cultures?.data.some((culture) =>
            culture?.attributes?.name
              ?.toLocaleLowerCase()
              .trim()
              .includes(cultureFilter?.toLocaleLowerCase())
          );

        return isChemistryMatch && isTypeMatch && isCultureMatch;
      }) ?? [],
    [products, activeChemistryFilter, typeFilter, cultureFilter]
  );

  const searchedElements = useMemo(() => {
    if (!searchResult) return filteredElements;

    const query = searchResult.toLowerCase();
    return filteredElements.filter(
      (el) =>
        el?.attributes?.name?.toLowerCase().includes(query) ||
        el?.attributes?.Active_substance?.toLowerCase().includes(query) ||
        el?.attributes?.description?.toLowerCase().includes(query) ||
        el?.attributes?.cultures?.data?.some((culture) =>
          culture?.attributes?.name.toLowerCase().includes(query)
        ) ||
        el?.attributes?.chemistries?.data?.some((chemistry) =>
          chemistry?.attributes?.name.toLowerCase().includes(query)
        ) ||
        el?.attributes?.sizes?.data?.some((size) =>
          size?.attributes?.name.toLowerCase().includes(query)
        )
    );
  }, [filteredElements, searchResult]);

  const sortedProducts = useMemo(
    () => sortCatalogProducts(searchedElements, sortOptions, currencyRate),
    [searchedElements, sortOptions, currencyRate]
  );

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const storedPosition = localStorage.getItem('scrollPosition');
    if (storedPosition) {
      window.scrollTo(0, +storedPosition);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY || window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('scrollPosition', scrollPosition.toString());
  }, [scrollPosition]);

  return (
    <Layout>
      <Backet />
      <FiltersModal
        isOpen={openFilterModal}
        result={searchedElements?.length}
        chemistryFilter={activeChemistryFilter?.toLowerCase()}
        cultureFilter={cultureFilter?.toLowerCase()}
        typeFilter={typeFilter?.toLowerCase()}
        categoryPageSlug={category?.slug}
      />
      <ChemistryElements variant={category ? 'nav' : 'full'} activeSlug={category?.slug} />
      {category && <CategoryIntro category={category} />}
      <div className={styles.page}>
        <div className={styles.catalogLayout}>
          <aside className={styles.sidebar}>
            <FilterComponent
              chemistryFilter={activeChemistryFilter?.toLowerCase()}
              cultureFilter={cultureFilter?.toLowerCase()}
              typeFilter={typeFilter?.toLowerCase()}
              result={searchedElements.length}
              categoryPageSlug={category?.slug}
            />
          </aside>
          <main className={styles.main}>
            {!category && (
              <h1 className={styles.pageTitle}>Каталог товарів</h1>
            )}
            <CatalogToolbar count={searchedElements.length} />
            <ProductsLayout
              array={sortedProducts}
              viewStyle={viewOptions}
              currencyRate={currencyRate}
            />
            <ConsultationBanner />
          </main>
        </div>
      </div>
    </Layout>
  );
};

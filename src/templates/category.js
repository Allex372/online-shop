import React from 'react';
import Seo from '../components/Seo/seo';
import { StructuredData } from '../components/Seo/StructuredData';
import { breadcrumbSchema, faqSchema } from '../components/Seo/schemas';
import { buildCategoryFaq } from '../lib/chemistryCategories';
import { CatalogPage } from '../components/Catalog/CatalogPage';
import { buildCanonical } from '../lib/seo';
import { getCategoryBySlug, getCategoryPath } from '../lib/chemistryCategories';

const CategoryTemplate = ({ pageContext }) => {
  const category = getCategoryBySlug(pageContext?.slug);

  if (!category) {
    return null;
  }

  return <CatalogPage category={category} />;
};

export default CategoryTemplate;

export const Head = ({ pageContext, location }) => {
  const category = getCategoryBySlug(pageContext?.slug);

  if (!category) {
    return <Seo title="Категорія | Вікторія Захід Трейд" noindex />;
  }

  const pathname = location?.pathname || getCategoryPath(category.slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Головна', url: '/' },
    { name: 'Каталог', url: '/products/' },
    { name: category.name, url: pathname },
  ]);
  const faq = category.faq || buildCategoryFaq(category.name);

  return (
    <>
      <Seo
        title={category.seoTitle}
        description={category.seoDescription}
        canonical={buildCanonical(pathname)}
      />
      <StructuredData data={[breadcrumbs, faqSchema(faq)]} />
    </>
  );
};

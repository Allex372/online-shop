import React from 'react';
import { ProductCard } from '../../ProdactsLayout/ProductCard/ProductCard';
import { Link } from 'gatsby';
import { getCategoryByFilterValue, getCategoryPath } from '../../../lib/chemistryCategories';
import * as styles from './RelatedProducts.module.css';

export const RelatedProducts = ({ products, chemistry, currencyRate }) => {
  if (!products?.length) return null;

  const category = getCategoryByFilterValue(chemistry);
  const title = category
    ? `Інші товари з категорії «${category.name}»`
    : 'Схожі товари';

  return (
    <section className={styles.section} aria-labelledby="related-heading">
      <div className={styles.header}>
        <h2 id="related-heading" className={styles.title}>
          {title}
        </h2>
        {category && (
          <Link to={getCategoryPath(category.slug)} className={styles.linkAll}>
            Уся категорія →
          </Link>
        )}
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currencyRate={currencyRate}
          />
        ))}
      </div>
    </section>
  );
};

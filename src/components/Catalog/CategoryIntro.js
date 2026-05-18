import React from 'react';
import { Link } from 'gatsby';
import { buildCategoryFaq } from '../../lib/chemistryCategories';
import * as styles from './CategoryIntro.module.css';

export const CategoryIntro = ({ category }) => {
  if (!category) return null;

  const faq = category.faq || buildCategoryFaq(category.name);
  const seoBody =
    category.seoBody ||
    `У каталозі «${category.name}» — перевірені препарати для аграріїв і фермерських господарств. Допоможемо з підбором, підкажемо наявність та організуємо доставку по Україні.`;

  return (
    <section className={styles.section} aria-labelledby="category-heading">
      <div className={styles.inner}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <Link to="/products/">Каталог</Link>
          <span aria-hidden="true">/</span>
          <span>{category.name}</span>
        </nav>
        <h1 id="category-heading" className={styles.title}>
          {category.name}
        </h1>
        <p className={styles.intro}>{category.intro}</p>
        <p className={styles.seoBody}>{seoBody}</p>
        <Link to="/products/" className={styles.linkAll}>
          Увесь каталог →
        </Link>

        {faq?.length > 0 && (
          <div className={styles.faq}>
            <h2 className={styles.faqTitle}>Часті питання</h2>
            <dl className={styles.faqList}>
              {faq.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
};

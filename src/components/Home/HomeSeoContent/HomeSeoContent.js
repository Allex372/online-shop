import React from 'react';
import { Link } from 'gatsby';
import { CHEMISTRY_CATEGORIES, getCategoryPath } from '../../../lib/chemistryCategories';
import * as styles from './HomeSeoContent.module.css';

export const HomeSeoContent = () => (
  <section className={styles.section} aria-labelledby="about-shop-heading">
    <div className={styles.inner}>
      <h2 id="about-shop-heading" className={styles.title}>
        Засоби захисту рослин та добрива в Україні
      </h2>
      <div className={styles.text}>
        <p>
          <strong>Вікторія Захід Трейд</strong> — постачальник агрохімії для
          фермерських господарств і приватних аграріїв. У каталозі — гербіциди,
          фунгіциди, інсектициди, протруйники, десиканти, ад&apos;юванти, добрива
          та стимулятори росту від перевірених виробників.
        </p>
        <p>
          Допомагаємо підібрати препарат під культуру, фазу розвитку та схему
          захисту, консультуємо щодо норм внесення та сумісності засобів. Замовлення
          можна оформити онлайн у кошику або зателефонувати — підкажемо наявність
          і терміни доставки по Україні.
        </p>
      </div>
      <div className={styles.categories}>
        <h3 className={styles.subtitle}>Популярні категорії</h3>
        <ul className={styles.categoryList}>
          {CHEMISTRY_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link to={getCategoryPath(cat.slug)}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

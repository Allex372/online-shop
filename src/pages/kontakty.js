import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/Seo/seo';
import { StructuredData } from '../components/Seo/StructuredData';
import { localBusinessSchema, breadcrumbSchema } from '../components/Seo/schemas';
import { Layout, Backet } from '../components';
import { buildCanonical } from '../lib/seo';
import '../components/index.css';
import * as styles from './kontakty.module.css';

import tg from '../images/social/tg.svg';
import vib from '../images/social/vib.svg';
import wa from '../images/social/wa.svg';

const KontaktyPage = () => (
  <Layout>
    <Backet />
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/">Головна</Link>
        <span>/</span>
        <span>Контакти</span>
      </nav>

      <h1 className={styles.title}>Контакти</h1>
      <p className={styles.lead}>
        Звʼяжіться з нами для підбору засобів захисту рослин, уточнення цін та
        оформлення замовлення. Працюємо з фермерами та приватними господарствами
        по всій Україні.
      </p>

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="contact-heading">
          <h2 id="contact-heading">Звʼязок</h2>
          <a className={styles.contactLink} href="tel:+380674711434">
            <strong>Телефон:</strong> 067 471 14 34
          </a>
          <a className={styles.contactLink} href="mailto:agrozakhyst.vovk@gmail.com">
            <strong>Email:</strong> agrozakhyst.vovk@gmail.com
          </a>
          <p className={styles.hours}>
            <strong>Графік:</strong> Пн–Пт 9:00–18:00
          </p>
          <div className={styles.socials}>
            <a href="https://t.me/+380674711434" target="_blank" rel="noreferrer">
              <img src={tg} alt="Telegram" />
              Telegram
            </a>
            <a href="viber://chat?number=%2B380674711434" target="_blank" rel="noreferrer">
              <img src={vib} alt="Viber" />
              Viber
            </a>
            <a href="https://wa.me/380674711434" target="_blank" rel="noreferrer">
              <img src={wa} alt="WhatsApp" />
              WhatsApp
            </a>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="help-heading">
          <h2 id="help-heading">Чим допоможемо</h2>
          <ul className={styles.list}>
            <li>Підбір гербіцидів, фунгіцидів, інсектицидів під вашу культуру</li>
            <li>Консультація щодо норм і термінів обробки</li>
            <li>Оформлення замовлення та доставка по Україні</li>
            <li>Актуальні ціни та наявність препаратів</li>
          </ul>
          <Link to="/products/" className={styles.cta}>
            Перейти до каталогу →
          </Link>
        </section>
      </div>
    </div>
  </Layout>
);

export const Head = ({ location }) => (
  <>
    <Seo
      title="Контакти — Вікторія Захід Трейд | ЗЗР та добрива"
      description="Телефон 067 471 14 34, email, месенджери. Консультація з підбору засобів захисту рослин, доставка по Україні."
      canonical={buildCanonical(location?.pathname || '/kontakty/')}
    />
    <StructuredData
      data={[
        localBusinessSchema(),
        breadcrumbSchema([
          { name: 'Головна', url: '/' },
          { name: 'Контакти', url: '/kontakty/' },
        ]),
      ]}
    />
  </>
);

export default KontaktyPage;

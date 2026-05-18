import React from 'react'
import { Link } from 'gatsby'
import topHerbicides from '../../../images/main/topgerbicyd.jpg'
import fertilizers from '../../../images/main/dobryva-dlia-rostu.webp'
import adjuvants from '../../../images/main/adiuvanty.webp'
import { getCategoryByFilterValue, getCategoryPath } from '../../../lib/chemistryCategories'
import * as styles from './HeroSection.module.css'

const featured = [
  {
    title: 'Топові гербіциди',
    image: topHerbicides,
    alt: 'Пшеничне поле',
    chemistryFilter: 'гербіциди',
  },
  {
    title: 'Добрива для росту',
    image: fertilizers,
    alt: 'Паросток у ґрунті',
    chemistryFilter: 'добрива',
  },
  {
    title: "Ад'юванти та прилипачі",
    image: adjuvants,
    alt: 'Краплі води на листі',
    chemistryFilter: "Прилипачі (ад'юванти)",
  },
]

export const HeroSection = () => (
  <section className={styles.hero}>
    <div className={styles.main}>
      <h1 className={styles.title}>
        Ефективні рішення для{' '}
        <span className={styles.highlight}>кожного етапу росту</span>
      </h1>
      <p className={styles.subtitle}>
        Якісна агрохімія, перевірена досвідом. Працюємо для вашого врожаю!
      </p>
      <Link to="/products/" className={styles.cta}>
        Переглянути каталог →
      </Link>
    </div>

    <div className={styles.cards}>
      {featured.map((card) => {
        const category = getCategoryByFilterValue(card.chemistryFilter)
        const to = category ? getCategoryPath(category.slug) : '/products/'

        return (
          <Link key={card.title} to={to} className={styles.card}>
            <img
              className={styles.cardImage}
              src={card.image}
              alt={card.alt}
              loading="lazy"
            />
            <div className={styles.cardOverlay} aria-hidden />
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>{card.title}</p>
              <span className={styles.cardLink}>Переглянути →</span>
            </div>
          </Link>
        )
      })}
    </div>
  </section>
)

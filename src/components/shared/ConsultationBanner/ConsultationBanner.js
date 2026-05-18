import React from 'react'
import * as styles from './ConsultationBanner.module.css'

export const ConsultationBanner = () => (
  <section className={styles.banner}>
    <div className={styles.content}>
      <h2 className={styles.title}>Потрібна консультація?</h2>
      <p className={styles.text}>
        Наші фахівці допоможуть підібрати препарат під вашу культуру та площу.
      </p>
      <a href="tel:+380674711434" className={styles.button}>
        Зв&apos;язатися з нами
      </a>
    </div>
    <div className={styles.icon} aria-hidden>
      🌾
    </div>
  </section>
)

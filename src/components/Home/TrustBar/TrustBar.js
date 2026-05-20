import React from 'react'
import * as styles from './TrustBar.module.css'

const items = [
  {
    icon: '✓',
    title: 'Перевірена якість',
    text: 'Працюємо з офіційними постачальниками',
  },
  {
    icon: '🚚',
    title: 'Швидка доставка',
    text: 'По Україні протягом 1–3 днів',
  },
  {
    icon: '💬',
    title: 'Професійна підтримка',
    text: 'Консультації агрономів щодня',
  },
]

export const TrustBar = () => (
  <section className={styles.bar}>
    {items.map((item) => (
      <article key={item.title} className={styles.card}>
        <span className={styles.icon}>{item.icon}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.text}>{item.text}</p>
      </article>
    ))}
  </section>
)

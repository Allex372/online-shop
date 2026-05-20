import React from 'react'
import { Link } from 'gatsby'
import { useFilter } from '../../../features/catalog'
import * as styles from './AudienceToggle.module.css'

export const AudienceToggle = () => {
  const { typeFilter, changeTypeFilter } = useFilter()

  const isFarmer = typeFilter?.toLowerCase() === 'фермерське'
  const isGarden = typeFilter?.toLowerCase() === 'присадибне'

  return (
    <section className={styles.section}>
      <div className={styles.toggle}>
        <Link
          to="/products"
          className={`${styles.option} ${isFarmer ? styles.optionActive : ''}`}
          onClick={() => changeTypeFilter('фермерське')}
        >
          Фермерське
        </Link>
        <Link
          to="/products"
          className={`${styles.option} ${isGarden ? styles.optionActive : ''}`}
          onClick={() => changeTypeFilter('присадибне')}
        >
          Присадибне
        </Link>
      </div>
    </section>
  )
}

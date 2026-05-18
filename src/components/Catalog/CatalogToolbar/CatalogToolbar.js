import React from 'react'
import { useFilter } from '../../../features/catalog'
import { SortComponent } from '../../SortComponent'
import filterIcon from '../../../images/filter.svg'
import * as styles from './CatalogToolbar.module.css'

export const CatalogToolbar = ({ count }) => {
  const { handleOpenFilterModal } = useFilter()

  return (
    <div className={styles.toolbar}>
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          handleOpenFilterModal(true)
        }}
      >
        <img src={filterIcon} alt="" />
        Фільтри
      </button>
      <p className={styles.count}>
        Знайдено: <strong>{count}</strong> товарів
      </p>
      <div className={styles.sort}>
        <SortComponent />
      </div>
    </div>
  )
}

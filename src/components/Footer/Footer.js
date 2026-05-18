import * as React from "react"
import { Link } from "gatsby"
import { CHEMISTRY_CATEGORIES, getCategoryPath } from "../../lib/chemistryCategories"
import logo from "../../images/logo.png"
import tg from "../../images/social/tg.svg"
import vib from "../../images/social/vib.svg"
import wa from "../../images/social/wa.svg"
import * as styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="Вікторія Захід Трейд" className={styles.logo} />
          <p className={styles.about}>
            Агро рішення для вашого успіху. Працюємо з фермерами та приватними
            господарствами по всій Україні.
          </p>
        </div>
        <div className={styles.links}>
          <h4>Каталог</h4>
          <Link to="/products/">Усі товари</Link>
          {CHEMISTRY_CATEGORIES.map((cat) => (
            <Link key={cat.slug} to={getCategoryPath(cat.slug)}>
              {cat.name}
            </Link>
          ))}
        </div>
        <div className={styles.links}>
          <h4>Компанія</h4>
          <Link to="/kontakty/">Контакти</Link>
          <Link to="/">Головна</Link>
          <Link to="/products/">Каталог ЗЗР</Link>
        </div>
        <div className={styles.links}>
          <h4>Звʼязок</h4>
          <a href="tel:+380674711434">067 471 14 34</a>
          <a href="mailto:agrozakhyst.vovk@gmail.com">agrozakhyst.vovk@gmail.com</a>
          <p className={styles.hours}>Пн–Пт 9:00–18:00</p>
          <div className={styles.socials}>
            <a href="https://t.me/+380674711434" target="_blank" rel="noreferrer">
              <img alt="Telegram" src={tg} />
            </a>
            <a href="viber://chat?number=%2B380674711434" target="_blank" rel="noreferrer">
              <img alt="Viber" src={vib} />
            </a>
            <a href="https://wa.me/380674711434" target="_blank" rel="noreferrer">
              <img alt="WhatsApp" src={wa} />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.copy}>© 2020 Вікторія Захід Трейд</p>
    </footer>
  )
}

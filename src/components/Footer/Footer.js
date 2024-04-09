import * as React from "react"
import logo from "../../images/logo.png"
import tg from "../../images/social/tg.svg"
import vib from "../../images/social/vib.svg"
import wa from "../../images/social/wa.svg"

import * as styles from "./Footer.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

export const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.socialWrapper}>
        <p>Ми у месенджері:</p>
        <div className={styles.iconWrapper}>
          <a href="https://t.me/+380674711434" target="_blank" rel="noreferrer">
            <img alt="social" src={tg} />
          </a>

          <a
            href="viber://chat?number=%2B380674711434"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="social" src={vib} />
          </a>

          <a href="https://wa.me/380674711434" target="_blank" rel="noreferrer">
            <img alt="social" src={wa} />
          </a>
        </div>
      </div>
      <div className={styles.lastWrapper}>
        <a
          href="tel:+380674711434"
          target="_blank"
          rel="noreferrer"
          className={styles.btnCall}
        >
          <FontAwesomeIcon
            icon={faPhone}
            size="lg"
            className={styles.iconPhone}
          />
          Зателефонувати
        </a>

        <p className={styles.email}>agrozakhyst.vovk@gmail.com</p>
        {/* <p className={styles.dillers}>Виробники:
                    <a href="https://agrohimteh.com.ua/" className={styles.link} target='blank'> Агрохімічні технології</a>
                </p> */}
      </div>
    </div>
  )
}

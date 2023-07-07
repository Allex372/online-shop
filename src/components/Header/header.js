import * as React from "react";
import * as styles from './header.module.css';
import logo from '../../images/logo.png';
import tg from '../../images/social/tg.svg';
import vib from '../../images/social/vib.svg';
import wa from '../../images/social/wa.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';


export const Header = () => (
  <header className={styles.wrapper}>
    <div className={styles.logoWrapper}>
      <img alt='logo' src={logo} />
    </div>
    <div className={styles.socialsWrapper}>

      <div className={styles.social}>
        <img alt="social" src={tg} />
      </div>

      <div className={styles.social}>
        <img alt="social" src={vib} />
      </div>

      <div className={styles.social}>
        <img alt="social" src={wa} />
      </div>

      <button className={styles.btnCall}>Зателефонувати</button>
      <div className={styles.iconPhoneWrapper}>
        <a href="tel:+380000000" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faPhone} size="lg" className={styles.iconPhone} />
        </a>
      </div>
    </div>
  </header >
)
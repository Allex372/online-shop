import * as React from "react";
import logo from '../../images/logo.png';
import tg from '../../images/social/tg.svg';
import vib from '../../images/social/vib.svg';
import wa from '../../images/social/wa.svg';

import * as styles from './Footer.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';


export const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <img src={logo} alt='logo' className={styles.logo} />
            </div>
            <div className={styles.socialWrapper}>
                <p>Ми у месенджері:</p>
                <div className={styles.iconWrapper}>
                    <img src={tg} alt='telegram icon' />
                    <img src={vib} alt='viber icon' />
                    <img src={wa} alt='whats up icon' />
                </div>
            </div>
            <div className={styles.lastWrapper}>
                <button className={styles.btnCall}>
                    <a href="tel:+380000000" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faPhone} size="lg" className={styles.iconPhone} />
                    </a>
                    Зателефонувати
                </button>
                <p className={styles.email}>agrozakhyst.vovk@gmail.com</p>
                <p className={styles.dillers}>Виробники:
                    <a href="https://agrohimteh.com.ua/" className={styles.link} target='blank'> Агрохімічні технології</a>
                </p>
            </div>
        </div>
    )
}
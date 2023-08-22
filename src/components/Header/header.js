import React, { useState, useEffect } from "react";
import { SortComponent, FilterComponent } from '../index';
import { useBacket } from "../../context/BacketProvider";
import { useFilter } from "../../context/FilterProvider";
import { useSideBar } from "../../context/SideBarProvider";
import { navigate } from "gatsby";

import * as styles from './header.module.css';

import logo from '../../images/logo.png';
import tg from '../../images/social/tg.svg';
import vib from '../../images/social/vib.svg';
import wa from '../../images/social/wa.svg';
import backet from '../../images/purchase.png';
import burger from '../../images/burger-bar.png';
import close from '../../images/close.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  const resultFilterContext = useFilter();
  const { cultureFilter, chemistryFilter, typeFilter } = resultFilterContext ? resultFilterContext : {};

  const backetContext = useBacket();
  const { handleOpenBacket, items } = backetContext ? backetContext : {};

  const sideBarContext = useSideBar();
  const { menuStatus, handleSideBar, setMenuStatus } = sideBarContext ? sideBarContext : {};

  const [currentPath, setCurrentPath] = useState('');

  const [style, setStyle] = useState(styles.menu);


  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (menuStatus) {
      document.body.classList.add(styles.bodyNoScroll);
      setStyle(`${styles.menu} ${styles.active}`);
    } else {
      document.body.classList.remove(styles.bodyNoScroll);
      setStyle(styles.menu);
    }
  }, [menuStatus]);

  const handleLogoClick = () => {
    setMenuStatus(false);
    navigate('/');
  }

  return (
    <>
      <header className={styles.wrapper}>
        {
          currentPath.includes("/products/") &&
          <div className={styles.burgerMenu} onClick={() => handleSideBar()}>
            <img src={menuStatus ? close : burger} alt='burger' />
          </div>
        }
        <div className={styles.logoWrapper} onClick={() => handleLogoClick()}>
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

          <div className={styles.backet} onClick={() => handleOpenBacket()}>
            <img alt="backet" src={backet} />
            {
              items?.length >= 1 &&
              <div className={styles.backetLength}>
                <p>{items?.length}</p>
              </div>
            }
          </div>
        </div>
      </header >

      <div>
        <div className={style}>
          <div className={styles.sidebarWrapper}>
            <div className={styles.filterWrapper}>
              <SortComponent />
            </div>
            <div className={styles.filterWrapper}>
              <FilterComponent chemistryFilter={chemistryFilter?.toLowerCase()} cultureFilter={cultureFilter?.toLowerCase()} typeFilter={typeFilter?.toLowerCase()} />
            </div>
            <div className={styles.contactsMobile}>
              <div className={styles.socialMobile}>
                <img alt="social" src={tg} />
              </div>

              <div className={styles.socialMobile}>
                <img alt="social" src={vib} />
              </div>

              <div className={styles.socialMobile}>
                <img alt="social" src={wa} />
              </div>

              <div className={styles.iconPhoneWrapperMobile}>
                <a href="tel:+380000000" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faPhone} size="lg" className={styles.iconPhone} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
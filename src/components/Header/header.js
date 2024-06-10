import React, { useState, useEffect } from "react"
import { useBacket } from "../../context/BacketProvider"
import { useResult } from "../../context/SearchResultProvider"
import { useSideBar } from "../../context/SideBarProvider"
import { useFilter } from "../../context/FilterProvider"
import { navigate } from "gatsby"
import { ModalSearch } from "../ModalSearch/ModalSearch"

import * as styles from "./header.module.css"

import tg from "../../images/social/tg.svg"
import vib from "../../images/social/vib.svg"
import wa from "../../images/social/wa.svg"
import backet from "../../images/purchase.png"
import close from "../../images/close.png"
import searchIcon from "../../images/search.svg"
import newLogo from "../../images/logo.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

export const Header = () => {
  const resultFilterContext = useFilter()
  const { changeCultureFilter, changeChemistryFilter, changeTypeFilter } =
    resultFilterContext ? resultFilterContext : {}

  const resultContext = useResult()
  const { changeSearchResult, searchResult } = resultContext
    ? resultContext
    : {}

  const backetContext = useBacket()
  const { handleOpenBacket, items } = backetContext ? backetContext : {}

  const sideBarContext = useSideBar()
  const { menuStatus, setMenuStatus } = sideBarContext ? sideBarContext : {}

  const [currentPath, setCurrentPath] = useState("")
  const [mobileSeacrhModal, setMobileSearchModal] = useState(false)

  const [style, setStyle] = useState(styles.menu)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  useEffect(() => {
    if (menuStatus) {
      document.body.classList.add(styles.bodyNoScroll)
      setStyle(`${styles.menu} ${styles.active}`)
    } else {
      document.body.classList.remove(styles.bodyNoScroll)
      setStyle(styles.menu)
    }
  }, [menuStatus])

  const handleLogoClick = () => {
    changeCultureFilter(null)
    changeChemistryFilter(null)
    changeTypeFilter(null)
    setMenuStatus(false)
    navigate("/")
  }

  const handleSearch = e => {
    changeSearchResult(e.target.value)
  }

  const handleClearSearch = () => {
    changeSearchResult("")
  }

  const handleSetResult = () => {
    if (searchResult.length) {
      navigate("/products")
    }
  }

  return (
    <>
      <header className={styles.wrapper}>
        <div
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogoClick()
            }
          }}
          role="button"
          tabIndex="0"
          className={styles.logoWrapper}
          onClick={() => handleLogoClick()}
        >
          <img alt="logo" src={newLogo} className={styles.logoImg} />
        </div>
        <div className={styles.volWrapper}>
          <div className={styles.socialsWrapper}>
            {currentPath !== "/products/" && (
              <div className={styles.searchContainer}>
                <div>
                  <input
                    type="text"
                    role="button"
                    className={styles.searchInput}
                    placeholder="Шукати"
                    onChange={e => handleSearch(e)}
                    value={searchResult}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        handleSetResult()
                      }
                    }}
                  />
                </div>
                {searchResult?.length > 0 ? (
                  <>
                    <div
                      className={styles.searchButton}
                      onClick={() => handleSetResult()}
                    >
                      <p>Шукати</p>
                    </div>
                    <img
                      src={close}
                      className={styles.clearIcon}
                      alt="clear"
                      onClick={() => handleClearSearch()}
                    />
                  </>
                ) : (
                  <img
                    src={searchIcon}
                    className={styles.searchIcon}
                    alt="Search Icon"
                  />
                )}
              </div>
            )}

            {currentPath !== "/products/" && (
              <div
                className={styles.mobileSearchIcon}
                onClick={() => setMobileSearchModal(true)}
              >
                <img
                  src={searchIcon}
                  className={styles.searchIcon}
                  alt="Search Icon"
                />
              </div>
            )}

            {mobileSeacrhModal && (
              <ModalSearch setMobileSearchModal={setMobileSearchModal} />
            )}

            <div className={styles.social}>
              <a
                href="https://t.me/+380674711434"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="social" src={tg} />
              </a>
            </div>

            <div className={styles.social}>
              <a
                href="viber://chat?number=%2B380674711434"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="social" src={vib} />
              </a>
            </div>

            <div className={styles.social}>
              <a
                href="https://wa.me/380674711434"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="social" src={wa} />
              </a>
            </div>

            <p className={styles.phoneNumberBig}>+380674711434</p>

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

            <div className={styles.backet} onClick={() => handleOpenBacket()}>
              <img alt="backet" src={backet} />
              {items?.length >= 1 && (
                <div className={styles.backetLength}>
                  <p>{items?.length}</p>
                </div>
              )}
            </div>
            
          </div>
          <p className={styles.phoneNumber}>+380674711434</p>
        </div>
      </header>

      <div>
        <div className={style}>
          <div className={styles.sidebarWrapper}>
            {/* <div className={styles.filterWrapper}>
              <SortComponent />
            </div> */}
            {/* <div className={styles.filterWrapper}>
              <FilterComponent chemistryFilter={chemistryFilter?.toLowerCase()} cultureFilter={cultureFilter?.toLowerCase()} typeFilter={typeFilter?.toLowerCase()} />
            </div> */}
            <div className={styles.contactsMobile}>
              {/* <div>
                <img alt="social" src={tg} />
              </div>

              <div>
                <img alt="social" src={vib} />
              </div>

              <div>
                <img alt="social" src={wa} />
              </div> */}

              <div>
                <a href="tel:+380674711434" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="lg"
                    className={styles.iconPhone}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

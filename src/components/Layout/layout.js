import React from "react";

import { Header, Footer } from '../index';
import { ScrollToTop } from '../ScrollToTop';
import * as styles from "./layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.footerWrapper} page-atmosphere`}>
        <main className={styles.main}>
          <Header />
          {children}
          
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}

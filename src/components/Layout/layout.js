import React from "react";

import { Header, Footer } from '../index';
import * as styles from "./layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.footerWrapper}>
        <main className={styles.main}>
          <Header />
          {children}
          
        </main>
        <Footer />
      </div>
    </div>
  )
}

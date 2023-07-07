import React from "react";

import { Header } from '../index';
import * as styles from "./layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <main className={styles.main}>
          <Header />
          {children}
        </main>
      </div>
    </div>
  )
}

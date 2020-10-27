import React from 'react';
import styles from './App.module.css'
import { Calculator } from "../Calculator/Calculator";

export const App = () => {
  return (
      <div className={styles.root}>
          <Calculator/>
      </div>
  )
}

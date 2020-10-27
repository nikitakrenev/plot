import React from 'react';
import styles from './Range.module.css'

export const Range = (props) => {
    return (
        <div className={styles.root}>
            <span className={styles.rangeLabel}>Range of values:</span>
            {props.children}
        </div>
    )
}
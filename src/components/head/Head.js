import React from 'react';
import styles from './Head.module.css';

const Head = ({title}) => {
    return (
        <div className={styles.headContainer}>
            <h1 className={styles.title}>
                {title}
            </h1>
        </div>
    )
}

export default Head;
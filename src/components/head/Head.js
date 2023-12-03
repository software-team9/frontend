import React from 'react';
import styles from './Head.module.css';

const Head = ({title}) => {
    return (
        <div className={styles.headContainer}>
            <h2 className={styles.title}>
                {title}
            </h2>
        </div>
    )
}

export default Head;
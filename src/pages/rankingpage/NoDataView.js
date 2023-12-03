import React from 'react';
import styles from './NoDataView.module.css';

const NoDataView = () => {
  return (
    <div className={styles.noDataContainer}>
      <p>명예의 전당에 등록된 가게가 없어요.</p>
    </div>
  );
};

export default NoDataView;

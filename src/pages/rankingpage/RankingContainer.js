import React from 'react';
import styles from './RankingContainer.module.css';

const RankingContainer = ({ currentStores, handleStoreClick }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {currentStores.map((store, index) => (
            <tr 
              key={store.storeId} 
              className={styles.storeItem} 
              onClick={() => handleStoreClick(store.storeId)}>
              <td className={styles.rankBox}>
                <p className={styles.rankNumber}>{index + 1}</p>
              </td>
              <td>
                <img src={store.image} alt="가게 이미지" />
              </td>
              <td>
                <p className={styles.storeName}>{store.storeName} ✩ {store.avr_rating}</p>
                <p className={styles.storeAddress}>{store.address}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingContainer;

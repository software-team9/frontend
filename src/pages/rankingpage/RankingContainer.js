import React from "react";
import styles from "./RankingContainer.module.css";

const RankingContainer = ({ currentStores, handleStoreClick }) => {
  return (
    <div>
      <table className={styles.tableContainer}>
        <tbody>
          {currentStores.map((store, index) => (
            <tr
              key={store.storeId}
              className={styles.storeItem}
              onClick={() => handleStoreClick(store.storeId)}
            >
              {/* Display rank, image, and detailed information in a table row */}

              <td className={styles.rankBox}>
                <p className={styles.rankNumber}>{index + 1}</p>
              </td>
              <td>
                <img src={store.image} alt={"가게"} />
              </td>
              <td>
                <p className={styles.storeName}>
                  {store.storeName} ✩ {store.avr_rating}
                </p>
                <p className={styles.storeAdress}>{store.address}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingContainer;

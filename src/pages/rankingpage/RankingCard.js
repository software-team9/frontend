import React from "react";
import styles from "./RankingCard.module.css";

const RankingCard = ({ rank, imageSrc, name = "", rating, address }) => {
    const rankStyle = {
        backgroundColor: rank === 1 ? '#ffd700' : rank === 2 ? '#DBE4EB' : rank === 3 ? '#cd7f32' : '#D32323', // 금색, 은색, 브론즈색, 기본색
        width: rank <= 3 ? '2em' : '1em', // rank 1, 2, 3일 때 크기 증가
        height: rank <= 3 ? '2em' : '1em', // rank 1, 2, 3일 때 크기 증가
        fontSize: rank <= 3 ? '1.5rem' : '0.875rem', // rank 1, 2, 3일 때 글씨 크기 증가
        textDecoration: rank <= 3 ? 'underline' : '0',
    };

    return (
        <div className={styles.card}>
            <img src={imageSrc} alt="Shop" className={styles.shopImage} />
            <div className={styles.cardContent}>
                <h3 className={styles.shopName}>{name}</h3>
                <div className={styles.rating}>{`⭐ ${rating}`}</div>
                {/* <p className={styles.shopAddress}>{address}</p> */}
            </div>
            <div className={styles.rankLabel} style={rankStyle}>{`${rank}`}</div>
        </div>
    );
};

export default RankingCard;

import React, { useState, useEffect } from 'react';
import styles from './Dday.module.css';
import axios from 'axios';

const Dday = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    "days": 0,
    "hours": 0
  });

  useEffect(() => {

    axios.get('seasonRank/next', {
      'Content-Type': 'application/json', 
    })
    .then(response => {
      console.log(response.data);
      setTimeLeft(response.data);
    })
    .catch(error => {
      // 에러 처리
      console.error('Error:', error);
    });

  }, [])

  const displayTimeLeft = () => {
    const { days, hours } = timeLeft;
    const dayDisplay = days ? `${days} days` : '';
    const timeDisplay = `${hours}h `;
    const isUrgent = days <= 7;

    return (
      <div className={isUrgent ? styles.urgent : styles.normal}>
        <div className={styles.dayDisplay}>{dayDisplay}</div>
        <div className={styles.timeDisplay}>{timeDisplay}</div>
      </div>
    );
  };

  return (
    <div className={styles.ddayContainer}>
      {Object.keys(timeLeft).length ? displayTimeLeft() : <span>Loading...</span>}
    </div>
  );
};

export default Dday;

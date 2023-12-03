import React, { useState, useEffect } from 'react';
import styles from './Dday.module.css';

const Dday = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24) + (days * 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeft = { days, hours, minutes, seconds };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const displayTimeLeft = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    const dayDisplay = days ? `${days} days` : '';
    const timeDisplay = `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
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

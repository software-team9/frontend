import React, { useState, useEffect } from "react";
import styles from "./Dday.module.css";
import axios from "axios";

const Dday = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours =
          Math.floor((difference / (1000 * 60 * 60)) % 24) + days * 24;

        timeLeft = { days, hours };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    axios
      .get("/seasonRank/next", {
        "Content-Type": "application/json",
      })
      .then((response) => {
        console.log(response.data);
        setTimeLeft(response);
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error:", error);
      });
    // http://15.165.26.32:8080/seasonRank/next
  }, []);

  const displayTimeLeft = () => {
    const { days, hours } = timeLeft;
    const dayDisplay = days ? `${days} days` : "";
    const timeDisplay = `${hours}h `;
    const isUrgent = days <= 7;

    const dummydate = 87;
    const dummytime = 7;
    return (
      <div className={isUrgent ? styles.urgent : styles.normal}>
        {/* <div className={styles.dayDisplay}>{dayDisplay}</div>
        <div className={styles.timeDisplay}>{timeDisplay}</div> */}
        <div className={styles.timeDisplay}>시즌종료까지</div>
        <div className={styles.dayDisplay}>D-{dummydate}일</div>
        {/* <div className={styles.timeDisplay}>{dummytime}</div> */}
      </div>
    );
  };

  return (
    <div className={styles.ddayContainer}>
      {Object.keys(timeLeft).length ? (
        displayTimeLeft()
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Dday;

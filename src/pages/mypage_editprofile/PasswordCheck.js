import React, { useState } from "react";
import styles from "./PasswordCheck.module.css";
import { useNavigate } from "react-router-dom";

const PasswordCheck = ({ setpasswordCheckTrue }) => {
  const [pw, setPw] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPw(e.target.value);

  const handlePassword = () => {
    fetch(`http://15.165.26.32:8080/members/validate/${pw}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((response) => {
      if (response.ok) {
        setpasswordCheckTrue();
        navigate("/mypage/editprofile");
      }
      response.json()
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("상점 데이터 가져오기 오류:", error);
    });

    
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>비밀번호 확인</h1>
          <p className={styles.cardDescription}>계속하려면 비밀번호를 입력하세요</p>
        </div>
        <div className={styles.cardContent}>
          <div>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePasswordChange}
              required
              className={styles.passwordInput}
            />
            <button 
              type="submit" 
              className={styles.button}
              onClick={handlePassword}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCheck;

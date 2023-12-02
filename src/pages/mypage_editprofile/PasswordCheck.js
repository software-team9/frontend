import React, { useState } from "react";
import styles from "./PasswordCheck.module.css";
import { useNavigate } from "react-router-dom";

const PasswordCheck = ({ setpasswordCheckTrue }) => {
  const [pw, setPw] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPw(e.target.value);

  const handlePassword = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const userId = sessionStorage.getItem("token");
    setpasswordCheckTrue();
    navigate("/mypage/editprofile");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>비밀번호 확인</h1>
          <p className={styles.cardDescription}>계속하려면 비밀번호를 입력하세요</p>
        </div>
        <div className={styles.cardContent}>
          <form onSubmit={handlePassword}>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePasswordChange}
              required
              className={styles.passwordInput}
            />
            <button type="submit" className={styles.button}>
              확인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordCheck;

// Quit.js
import React, { useState } from "react";
import styles from "./PasswordCheck.module.css";
import Button from "../../components/button/Button";
import TopNav from "../../components/topnav/TopNav";
import { useNavigate } from 'react-router-dom';

const PasswordCheck = ({setpasswordCheckTrue}) => {
  const [pw, setPw] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPw(e.target.value);

  const handlePassword = (setpasswordCheckTrue) => {
    const userId = sessionStorage.getItem('token');
    // fetch('URL', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       UserId: userId,
    //       password: pw
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then(response => {
    //     if(response.meessage === 'OK') {
    //       passwordCheckHandler();
    //       navigate('/mypage/editprofile');
    //     }
    //     else {
    //       alert("벡엔드쪽 문제 발생");
    //     }
    //   })

      setpasswordCheckTrue();
      navigate('/mypage/editprofile');

  }



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <div>
      <h1 className={styles.quitTitle}>비밀번호 확인</h1>
      <input
          type="password"
          placeholder="사용중인 비밀번호"
          value={pw}
          onChange={handlePasswordChange}
          required
          className={styles.passwordInput}
        />
        <Button 
          text="확인" 
          size="long" 
          onClick={() => handlePassword(setpasswordCheckTrue)}/>
      </div>
    </div>
  );
};

export default PasswordCheck;

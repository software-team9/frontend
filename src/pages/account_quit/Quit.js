// Quit.js
import React, { useState } from "react";
import styles from "./Quit.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head/Head";
import axios from 'axios';

const Quit = ({ userData, logoutHandler }) => {
  const [pw, setPw] = useState(null);
  const [pw_r, setPw_r] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPw(e.target.value);
  const handlePassword_RChange = (e) => setPw_r(e.target.value);

  const handleQuit = (userData, logoutHandler) => {
    if (pw === pw_r) {

      axios.delete('/members/delete', {
        password: pw
      }, {
        headers: {
          'Content-Type': 'application/json',
        }, withCredentials: true
      })
      .then(response => {
        if(response.ok) {
          console.log(response.data);
          logoutHandler();
          navigate('/');
        }

      })
      .catch(error => {
        console.error('에러:', error);
        console.log('요청 구성:', error.config);
      });

    }
  }


  return (
    <div className={styles.container}>
      <Head title="회원 탈퇴" />
      <div className={styles.separator}></div>
      <p className={styles.subtitle}>
        계정을 삭제하시려는 이유를 말씀해주세요. <br></br> 제품 개선에 중요자료로
        활용하겠습니다.
      </p>
      <div className={styles.quitForm}>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>기록 삭제 목적</span>
        </label>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>이용이 불편하고 장애가 많아서</span>
        </label>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>다른 사이트가 더 좋아서</span>
        </label>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>삭제하고 싶은 내용이 있어서</span>
        </label>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>사용빈도가 낮아서</span>
        </label>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>콘텐츠 불만</span>
        </label>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.label}>기타</span>
        </label>
      </div>
      <div>
        <br/>
        <div className={styles.warningTextarea}>
          계정을 삭제하면 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
        </div>
        <input
          type="password"
          placeholder="사용중인 비밀번호"
          value={pw}
          onChange={handlePasswordChange}
          required
          className={styles.passwordInput}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={pw_r}
          onChange={handlePassword_RChange}
          required
          className={styles.passwordInput}
        />
        <Button
          text="탈퇴하기"
          size="long"
          onClick={() => handleQuit(userData, logoutHandler)}
        />
      </div>
    </div>
  );
};

export default Quit;

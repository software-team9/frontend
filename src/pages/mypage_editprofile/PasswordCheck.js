import React, { useState } from "react";
import styles from "./PasswordCheck.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head/Head";

const PasswordCheck = ({ setpasswordCheckTrue }) => {
  const [pw, setPw] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPw(e.target.value);

  const handlePassword = (setpasswordCheckTrue) => {
    const userId = sessionStorage.getItem("token");
    setpasswordCheckTrue();
    navigate("/mypage/editprofile");
  };

  return (
    <div className={styles.container}>
      <Head title="비밀번호 확인" />
      <div>
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
          onClick={() => handlePassword(setpasswordCheckTrue)}
        />
      </div>
    </div>
  );
};

export default PasswordCheck;

// Inquiry.js
import React, { useState } from "react";
import Button from "../../components/button/Button";
import styles from "./PasswordCheck.module.css";
import TopNav from "../../components/topnav/TopNav";
import { useNavigate } from 'react-router-dom';
import Head from "../../components/head/Head";

const EditProfile = ({userData, setpasswordCheckFalse}) => {
  const [name, setName] = useState(null);
  const [pw, setPw] = useState(null);
  const [pw_r, setPw_r] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPw(e.target.value);
  const handlePassword_RChange = (e) => setPw_r(e.target.value);
  const handleBirthdayChange = (e) => setBirthday(e.target.value);

  const handleConfirm = (e) => {
    if (name && pw && pw_r && birthday ) {
        if (pw === pw_r) {
          setpasswordCheckFalse();
          console.log("대충 로그인 성공")
          navigate('/mypage');
        } 
        else {
          alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }  
    }
    else {
      alert('모든 필수 항목을 채워주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
        <Head title="회원정보 수정"/>
      </div>
        <div className={styles.signUpForm}>
        <input
          type="name"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          required
          className={styles.nameInput}
        />
        {/* 비밀번호 입력란 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePasswordChange}
          required
          className={styles.passwordInput}
        />
        <input
          type="password_re"
          placeholder="비밀번호 확인"
          value={pw_r}
          onChange={handlePassword_RChange}
          required
          className={styles.passwordInput}
        />

        {/* 날짜 입력란 */}
        <input 
          type="date" 
          required 
          className={styles.dateInput}
          value={birthday}
          onChange={handleBirthdayChange} />
        
        {/* 확인 */}
        <Button 
          text="확인" 
          size="long" 
          onClick={() => handleConfirm(userData, setpasswordCheckFalse)}
        />
      </div>
    </div>
  );
};

export default EditProfile;

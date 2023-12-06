// Inquiry.js
import React, { useState } from "react";
import Button from "../../components/button/Button";
import styles from "./Inquiry.module.css";
import TopNav from "../../components/topnav/TopNav";
import { useNavigate } from 'react-router-dom';

const Inquiry = ({userData}) => {
  // 상태 변수 추가
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const navigate = useNavigate();
  
  const handleInquiryTitle = (e) => {
    setInquiryTitle(e.target.value);
  }
  const handleInquiryContent = (e) => {
    setInquiryContent(e.target.value);
  }

  // 폼 제출 핸들러
  const handleInquirySubmit = () => {
    fetch('URL', {
      method: 'POST',
      body: JSON.stringify({
        userId: userData,
        inquiryTitle,
        inquiryContent
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      console.log(response.message);
      navigate('/mypage');
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      </div>
      <div className={styles.title}>
        <h1>문의하기</h1>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.inquiryForm} >
          <label htmlFor="inquiryTitle">문의 제목</label>
          <input
            id="inquiryTitle"
            placeholder="문의 제목을 입력하세요"
            value={inquiryTitle}
            onChange={handleInquiryTitle}
            required
          />

          <br/>


          <label htmlFor="inquiryContent">문의 내용</label>
          <textarea
            id="inquiryContent"
            placeholder="문의 내용을 입력하세요"
            value={inquiryContent}
            onChange={handleInquiryContent}
            required
          />

        <Button type="submit" text="확인" size="long" onClick={handleInquirySubmit} />
      </div>
    </div>
  );
};

export default Inquiry;

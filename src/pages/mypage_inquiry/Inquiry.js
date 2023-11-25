// Inquiry.js
import React from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./Inquiry.module.css"; // Create a new CSS file for Inquiry styles
import TopNav from "../../components/topnav/TopNav";

const Inquiry = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <div className={styles.title}>
        <h1>문의하기</h1>
      </div>
      <div className={styles.separator}></div>
      <form className={styles.inquiryForm}>
        <textarea placeholder="문의 내용을 입력하세요" required />
        <Button text="확인" size="long" />
      </form>
      <BottomNav />
    </div>
  );
};

export default Inquiry;

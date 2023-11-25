// Quit.js
import React from "react";
import styles from "./Quit.module.css";
import Button from "../../components/button/Button";
import TopNav from "../../components/topnav/TopNav";
import BottomNav from "../../components/bottomnav/BottomNav";

const Quit = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <h1 className={styles.quitTitle}>회원 탈퇴</h1>
      <div className={styles.separator}></div>
      <p className={styles.quitText}>
        계정을 삭제하시려는 이유를 말씀해주세요.
        제품 개선에 중요자료로 활용하겠습니다.
      </p>
      <br />
      <form className={styles.quitForm}>
        <label>
          <input type="checkbox" /> 기록 삭제 목적
        </label>
        <label>
          <input type="checkbox" /> 이용이 불편하고 장애가 많아서
        </label>
        <label>
          <input type="checkbox" /> 다른 사이트가 더 좋아서
        </label>
        <label>
          <input type="checkbox" /> 삭제하고 싶은 내용이 있어서
        </label>
        <label>
          <input type="checkbox" /> 사용빈도가 낮아서
        </label>
        <label>
          <input type="checkbox" /> 콘텐츠 불만
        </label>
        {/* 여러 체크박스 항목들을 추가해주세요 */}
        <label>
          <input type="checkbox" /> 기타
        </label>
        <div className={styles.warningTextarea}>계정을 삭제하면 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.</div>
        <input
          type="password"
          placeholder="사용중인 비밀번호"
          className={styles.passwordInput}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className={styles.passwordInput}
        />
        <Button text="탈퇴하기" size="long" />
      </form>
      <BottomNav />
    </div>
  );
};

export default Quit;

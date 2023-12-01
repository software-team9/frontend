// ReviewReport.js
import React, { useState } from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./ReportReview.module.css"; // Using ReviewReport styles
import TopNav from "../../components/topnav/TopNav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from 'react-router-dom';


const ReviewReport = ({userData}, {reviewId}) => {
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }
  const handleContent = (e) => {
    setContent(e.target.value);
  }

  const handleReport = (userData, reviewId) => {
    // fetch('URL', {
    //   method: 'POST',
    //   body: JSON.stringify({ 
    //     ReviewId: reviewId,
    //     UserId: userData,
    //     category,
    //     content
    //   }),
    //   headers: {
    //     'Content-Type' : 'application/json'
    //   }
    // })
    // .then(response => {
    //   console.log(response.message);
    //   // navigate('/'); // 다시 전 more review로 되돌아감
    // })
    navigate('/')
  }

  


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <div className={styles.title}>리뷰 신고하기</div>
      <div className={styles.separator}></div>
      <div className={styles.reportType}>
        <img
          src="./categoryIcon.png"
          alt="Category Icon"
          className={styles.icon}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            신고유형
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={category}
            onChange={handleCategory}
            label="category"
          >
            <MenuItem value={'UNRELATED_CONTENT'}>가게와 관련없는 내용</MenuItem>
            <MenuItem value={'OBSCENE_LANGUAGE'}>음란성/욕설</MenuItem>
            <MenuItem value={'PRIVACY_RISK'}>개인정보 유출 위험</MenuItem>
            <MenuItem value={'INAPPROPRIATE_AD'}>부적절한 홍보 또는 광고</MenuItem>
            <MenuItem value={'OTHER'}>기타</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.reportForm}>
        <textarea
          placeholder="신고할 내용을 작성하세요"
          onChange={handleContent}
          value={content}
          required
          className={styles.textarea}
        ></textarea>
        <Button 
          text="확인" 
          size="long" 
          onClick={() => handleReport(userData, reviewId)}
          />
      </div>
      <BottomNav />
    </div>
  );
};

export default ReviewReport;

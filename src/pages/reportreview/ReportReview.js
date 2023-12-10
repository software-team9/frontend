// ReviewReport.js
import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import styles from "./ReportReview.module.css"; // Using ReviewReport styles
import TopNav from "../../components/topnav/TopNav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const ReviewReport = ({logoutHandler}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reviewId = queryParams.get("reviewId");

  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }
  const handleContent = (e) => {
    setContent(e.target.value);
  }

  const handleReport = () => {
    console.log("reviewId: ", reviewId, "type: ", category, "content : ", content)
    axios.post('/reports/', {
      reviewId: reviewId,
      type: category,
      content: content
    }, {
      'Content-Type': 'application/json',
    })
    .then(response => {

      // 서버 응답 처리
      console.log(response);

    })
    .catch((error) => {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.error("Fetch error", error.response.data);
        alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
      } else if (error.request) {
        // 서버가 응답하지 않은 경우
        console.error("No response was received", error.request);
      } else {
        // 그 외의 에러 발생 시
        console.error("Error", error.message);
      }
  
  })


    .then(response => {
      
      navigate('/');
      // navigate('/'); // 다시 전 more review로 되돌아감
    })
  }
  
  useEffect(()=> {
    axios.get('/members/auth', {
      'Content-Type': 'application/json', withCredentials:true,
    })
    .then(response => {
      if(!(response.status === 200)) {
      sessionStorage.setItem('IsLogin', false);
      navigate('/')
      logoutHandler()
      }
  
    })
    .catch((error) => {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.error("Fetch error", error.response.data);
        alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
      } else if (error.request) {
        // 서버가 응답하지 않은 경우
        console.error("No response was received", error.request);
      } else {
        // 그 외의 에러 발생 시
        console.error("Error", error.message);
      }
  
  })
  }, [])
  


  return (
    <div className={styles.container}>
      <div className={styles.header}>
      </div>
      <div className={styles.title}>리뷰 신고하기</div>
      <div className={styles.separator}></div>
      <div className={styles.reportType}>
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
          onClick={() => handleReport()}
          />
      </div>
    </div>
  );
};

export default ReviewReport;

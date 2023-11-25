// ReviewReport.js
import React from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./ReportReview.module.css"; // Using ReviewReport styles
import TopNav from "../../components/topnav/TopNav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ReviewReport = () => {
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
            // value={age}
            // onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>신고항목1</MenuItem>
            <MenuItem value={20}>신고항목2</MenuItem>
            <MenuItem value={30}>신고항목3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <form className={styles.reportForm}>
        <textarea
          placeholder="신고할 내용을 작성하세요"
          required
          className={styles.textarea}
        ></textarea>
        <Button text="확인" size="long" />
      </form>
      <BottomNav />
    </div>
  );
};

export default ReviewReport;

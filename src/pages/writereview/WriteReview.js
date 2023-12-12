import React, { useState, useEffect } from "react";
import styles from "./WriteReview.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import { useLocation } from "react-router-dom";
import TopNav from "../../components/topnav/TopNav";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

import HeadName from "../../components/head/Head";
import { Rating } from "@material-ui/lab/";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";

const WriteReview = ({ logoutHandler }) => {
  const [rating, setRating] = useState(0);
  const [storeName, setStoreName] = useState(
    sessionStorage.getItem("ReceiptStoreName")
  );
  const [address, setAddress] = useState(
    sessionStorage.getItem("ReceiptAddress")
  );
  const [reviewContent, setReviewContent] = useState("");
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setShowImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleWriteReview = () => {
    const formData = new FormData();

    formData.append("image", image);
    const body = {
      // image: image,
      storeName: storeName,
      content: reviewContent,
      ratingPoint: rating,
      address: address,
    };
    formData.append(
      "reviewDto",
      new Blob([JSON.stringify(body)], { type: "application/json" })
    );

    console.log(body.storeName, body.content, body.ratingPoint);
    axios
      .post("/reviews/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        alert("이미 리뷰를 작성한 가게입니다");
        console.error("오류 발생:", error);
        // 수정해야 하는 부분 -> 중복 가게 처리
      });
  };

  useEffect(() => {
    axios
      .get("/members/auth", {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        if (!(response.status === 200)) {
          sessionStorage.setItem("IsLogin", false);
          navigate("/");
          logoutHandler();
        }
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("Fetch error", error.response.data);
          alert(
            `에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`
          );
        } else if (error.request) {
          // 서버가 응답하지 않은 경우
          console.error("No response was received", error.request);
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
        }
      });
  }, []);

  useEffect(() => {
    console.log(rating);
  }, [rating]);
  return (
    <div className={styles.container}>
      <HeadName title="리뷰작성" />
      <div className={styles.separator}></div>
      <div className={styles.head1}>
        <h3>가게 정보</h3>
      </div>
      <div>
        <input
          type="text"
          placeholder="가게이름"
          value={storeName || ""}
          onChange={handleStoreNameChange}
          required
          className={styles.Input}
          readOnly
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="가게주소"
          value={address || ""}
          onChange={handleAddressChange}
          required
          className={styles.Input}
          readOnly
        />
      </div>
      <div className={styles.head1}>
        <h3>리뷰 내용</h3>
      </div>
      <div>
        <textarea
          type="text"
          placeholder="리뷰 내용을 입력하세요"
          value={reviewContent || ""}
          onChange={handleReviewContentChange}
          required
          className={styles.textarea}
        />
      </div>
      <div>
        <Tooltip
          title={
            <React.Fragment>
              1. 다신 안갈 것 같아요.   <br />
              2. 내 돈 주고는 안갈 것 같아요. <br />
              3. 근처에 있으면 가볼 것 같아요. <br />
              4. 좀 멀어도 가볼 만 해요. <br />
              5. 아무리 멀어도 찾아가야 하는 곳! <br />
            </React.Fragment>
          }
          placement="top"
        >
          <text>리뷰 가이드</text>
        </Tooltip>
      </div>

      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <div>
        {showImage && (
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            <img src={showImage} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </div>
        )}
      </div>
      <br />

      <div className={styles.div1}>
        <label htmlFor="upload-button" className={styles.uploadButtonStyle}>
          사진 선택/촬영
        </label>
      </div>

      <div className={styles.div1}>
        <label className={styles.uploadButtonStyle} onClick={handleWriteReview}>
          리뷰 작성하기
        </label>
      </div>

      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleImageChange}
        required
      />
    </div>
  );
};

export default WriteReview;

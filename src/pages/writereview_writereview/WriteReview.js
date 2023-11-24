import React, { useState } from "react";
import useReviewHook from "../../hooks/useReviewHook";
import styles from "./WriteReview.module.css";

const WriteReview = () => {
  const { addReview } = useReviewHook();
  const [review, setReview] = useState({
    storeName: "",
    rating: 0,
    text: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview(review);
    // 폼을 제출한 후 필요한 상태 업데이트 또는 페이지 이동 로직을 구현합니다.
  };

  return (
    <form onSubmit={handleSubmit}>{/* 폼 필드와 버튼을 구현합니다. */}</form>
  );
};

export default WriteReview;

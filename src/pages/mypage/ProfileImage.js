// ProfileImage.js
import React from "react";
import styles from "./MyPage.module.css";

const ProfileImage = () => {
  return (
    <div className={styles.profileImage}>
      <img
        src="../UserImageExample.png" // Adjust the path to go up one level
        alt="프로필 이미지"
        className={styles.image}
      />
    </div>
  );
};

export default ProfileImage;

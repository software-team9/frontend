// ProfileImage.js
import React from "react";
import styles from "./MyPage.module.css";

const ProfileImage = () => {
  return (
    <div className={styles.profileImage}>
      <img 
        src="/img/UserImageExample.png" 
        className={styles.image} 
        alt="프로필 이미지" 
        />
  
   
    </div>
  );
};

export default ProfileImage;

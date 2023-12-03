import React, { useState } from 'react';
import styles from "./ReceiptCheck.module.css";
import { useNavigate } from 'react-router-dom';
import HeadName from "../../components/head/Head";


const ReceiptCheck = () => {
    const [storeName, setStoreName] = useState(sessionStorage.getItem('ReceiptStoreName'));
    const [address, setAddress] = useState(sessionStorage.getItem('ReceiptAddress'));
    const navigate = useNavigate();




      const handlePrevious = () => {
        navigate('/writereview/receiptRecognition')
      }

      const handleConfirm = () => {
        navigate('/writereview/writereview')
      }

    return (
        <div className={styles.container}>
            <p className={styles.Text}>
                영수증에서 인식한 가게 이름과 주소입니다. <br/>
                이 이름과 주소를 사용하시겠습니까?<br/>        
            </p>
            <div className={styles.separator}></div> 
            <div className={styles.heading}>
                <h3>가게이름</h3>
            <input
                type="storeName"
                placeholder="가게이름"
                value={storeName || ''}
                required
                className={styles.Input}
                readOnly
                />

            <h3>가게주소</h3>
                <input
                type="address"
                placeholder="가게주소"
                value={address || ''}
                required
                className={styles.Input}
                readOnly
                />
            </div>



            <div className={styles.Button}>
            <label 
        className={styles.uploadButtonStyle}
        onClick={handlePrevious}>
        다시 사진 올리기
        </label>
                <div>

                <label 
        className={styles.uploadButtonStyle}
        onClick={handleConfirm}>
        확인
        </label>


                </div>
            </div>
        </div>
    );
};

export default ReceiptCheck;
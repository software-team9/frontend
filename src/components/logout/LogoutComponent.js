import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const LogoutComponent = ({ onLogout }) => {
    const navigate = useNavigate();
   
    // 컴포넌트가 마운트될 때 로그아웃 처리 수행
    React.useEffect(() => {
      onLogout();
      navigate('/');
      sessionStorage.removeItem('token');
    }, [onLogout, navigate]);
  
    return (
      <div>
        {/* 로그아웃 페이지의 내용을 원하는 대로 작성 */}
        <p>You have been logged out.</p>
      </div>
    );
  };
  
  export default LogoutComponent;
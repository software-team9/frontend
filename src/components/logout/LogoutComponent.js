import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const LogoutComponent = ({logoutHandler}) => {
    const navigate = useNavigate();
   
    // 컴포넌트가 마운트될 때 로그아웃 처리 수행
    React.useEffect(() => {
      const logoutAndFetch = async () => {
        try {
          // 로그아웃 처리
   
          
          // fetch 요청


          fetch('http://15.165.26.32:8080/logout', {
            method : "POST",
            headers : {
              "Content-Type" : "application/json; charset=utf-8",
              // "Access-Control-Allow-Origin": `http://localhost:3000`,
              // 'Access-Control-Allow-Credentials':"true",
            },
          }) 
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
              console.log('Fetch request successful');
              logoutHandler();
              sessionStorage.setItem('IsLogin', false)
            }
          })
          .catch((error) => {
            // Handle errors here
            console.error('Fetch error:', error);
          });
  
          // 이후의 로직 수행
          navigate('/');
        } catch (error) {
          console.error('Error during fetch request:', error);
        }
      };
  
      // 호출
      logoutAndFetch();
    }, [navigate]);
  
    return (
      <div>
        {/* 로그아웃 페이지의 내용을 원하는 대로 작성 */}
        <p>You have been logged out.</p>
      </div>
    );
  };
  
  export default LogoutComponent;
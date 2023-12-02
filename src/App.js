import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';


import LoginPage from "./pages/account_login/LoginPage";
import Quit from "./pages/account_quit/Quit";
import SignUp from "./pages/account_signup/SignUp";
import MapPage from "./pages/mappage/MapPage";
import MoreReview from "./pages/morereviewinform/MoreReview";
import MoreStore from "./pages/morestoreinform/MoreStore";
import MyPage from "./pages/mypage/MyPage";
import EditProfile from "./pages/mypage_editprofile/EditProfile";
import PasswordCheck from "./pages/mypage_editprofile/PasswordCheck";
import Inquiry from "./pages/mypage_inquiry/Inquiry";
import MyInquiryList from "./pages/mypage_myinquirylist/MyInquiryList";
import MyReviewList from "./pages/mypage_myreviewlist/MyReviewList";
import MyWishList from "./pages/mypage_mywishlist/MyWishList";
import Ranking from "./pages/rankingpage/Ranking";
import ReportReview from "./pages/reportreview/ReportReview";
import SettingPage from "./pages/settingpage/SettingPage";
import ReceiptRecognition from "./pages/writereview_receiptrecogition/ReceiptRecognition";
import WriteReview from "./pages/writereview_writereview/WriteReview";

import LogoutComponent from "./components/logout/LogoutComponent";
import BottomNav from "./components/bottomnav/BottomNav";
import TopNav from "./components/topnav/TopNav";
// import createProxyMiddleware from "http-proxy-middleware"

import axios from 'axios';

function App() {
  // App.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: "http://15.165.26.32:8080",
  //     changeOrigin:true
  //   })
  // )
  const [reviewImage, setReviewImage] = useState(null);

  const { ReceiptCheck, setReceiptCheck } = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  // const [isLogin, setIsLogin] = useState(false); // 실제로 쓸땐 이거 사용
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);


  const loginHandler = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
  };

  const setReceiptCheckTrue = () => {
    setReceiptCheck(true);
  }

  const setReceiptCheckFalse = () => {
    setReceiptCheck(false);
  }

  const setpasswordCheckTrue = () => {
    setIsPasswordChecked(true);
  }
  const setpasswordCheckFalse = () => {
    setIsPasswordChecked(false);
  }
// // src/App.js
// useEffect(() => {
//   async function fetchdata() {
//     const API_URL = '/users';
//     const { data } = await axios.get(API_URL);
//     console.log(data);
//   }
//   fetchdata();

//   async function fetchDogs() {
//     const API_URL = '/api/breeds/image/random';
//     const { data } = await axios.get(API_URL);
//     console.log(data);
//   }
//   fetchDogs();

//   async function fetchTrends() {
//     const API_URL = '/trends/trendingsearches/daily/rss?geo=KR';
//     const { data } = await axios.get(API_URL);
//     console.log(data);
//   }
//   fetchTrends();
// }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <TopNav />
        <Routes>
          <Route 
            path="/login" 
            element={<LoginPage 
                        loginHandler={loginHandler}
                      />
                    } 
          />
          <Route 
            path="/quit" 
            element={
              isLogin ? (
                <Quit
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Ranking />} />
          <Route path="/map" element={<MapPage />} />
          <Route 
            path="/morereview" 
            element={
              isLogin ? (
                <MoreReview
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/morestore" 
            element={
              isLogin ? (
                <MoreStore
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            /> 
          <Route 
            path="/mypage" 
            element={
              isLogin ? (
                <MyPage
                  logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            /> 
          <Route 
            path="/mypage/editprofile" 
            element={
              isLogin ? (
                isPasswordChecked ? (
                  <EditProfile
                  setpasswordCheckFalse = {setpasswordCheckFalse}
                  />
                ) : (
                  <PasswordCheck
                  setpasswordCheckTrue={setpasswordCheckTrue}
                  />
                )
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />  
          <Route 
            path="/mypage/inquiry" 
            element={
              isLogin ? (
                <Inquiry
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/mypage/inquirylist" 
            element={
              isLogin ? (
                <MyInquiryList
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/mypage/reviewlist" 
            element={
              isLogin ? (
                <MyReviewList
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />  
          <Route 
            path="/mypage/wishlist" 
            element={
              isLogin ? (
                <MyWishList
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/reportreview" 
            element={
              isLogin ? (
                <ReportReview
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route path="/setting" element={<SettingPage />} />
          

          <Route 
            path="/writereview" 
            element={
              isLogin ? (
                ReceiptCheck ? (
                  <WriteReview
                    setReceiptCheck={setReceiptCheck}
                  />
                ) : (
                  <ReceiptRecognition
                    setReceiptCheck={setReceiptCheck}
                  />
                )
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />

          <Route
            path="/logout"
            element={<LogoutComponent onLogout={logoutHandler} />}
          />

            
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;

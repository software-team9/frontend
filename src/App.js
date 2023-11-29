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

import BottomNav from "./components/bottomnav/BottomNav";
import TopNav from "./components/topnav/TopNav";

function App() {

  const [isLogin, setIsLogin] = useState(true);
  // const [isLogin, setIsLogin] = useState(false); // 실제로 쓸땐 이거 사용
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [userData, setUserData] = useState(null);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const setUserInfo = (object) => {
    setUserData(object);
  };

  const logoutHandler = () => {
    setIsLogin(false);
  };

  const passwordCheckHandler = () => {
    setIsPasswordChecked(true);
  }
  const setpasswordCheckFalse = () => {
    setIsPasswordChecked(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <TopNav />
        <Routes>
          <Route 
            path="/login" 
            element={<LoginPage 
                        loginHandler={loginHandler}
                        setUserInfo={setUserInfo}
                      />
                    } 
          />
          <Route 
            path="/quit" 
            element={
              isLogin ? (
                <Quit
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<MapPage />} />
          <Route 
            path="/morereview" 
            element={
              isLogin ? (
                <MoreReview
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
          <Route 
            path="/morestore" 
            element={
              isLogin ? (
                <MoreStore
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
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
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
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
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
                ) : (
                  <PasswordCheck
                  passwordCheckHandler={passwordCheckHandler}
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
                )
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />  
          <Route 
            path="/mypage/inquiry" 
            element={
              isLogin ? (
                <Inquiry
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
          <Route 
            path="/mypage/inquirylist" 
            element={
              isLogin ? (
                <MyInquiryList
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
          <Route 
            path="/mypage/reviewlist" 
            element={
              isLogin ? (
                <MyReviewList
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />  
          <Route 
            path="/mypage/wishlist" 
            element={
              isLogin ? (
                <MyWishList
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
          <Route 
            path="/reportreview" 
            element={
              isLogin ? (
                <ReportReview
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
          <Route path="/setting" element={<SettingPage />} />
          <Route 
            path="/writereview/receiptrecognition" 
            element={
              isLogin ? (
                <ReceiptRecognition
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
          <Route 
            path="/writereview/writereview" 
            element={
              isLogin ? (
                <WriteReview
                  logoutHandler={logoutHandler}
                  userData={userData}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  setUserInfo={setUserInfo}
                  />
              )
            }
            />
            
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;

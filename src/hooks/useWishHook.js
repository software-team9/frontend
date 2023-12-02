import { useState } from "react";
import wishData from "./WishList.json";

const useWishHook = () => {
    
    const getWishList = () => { // 현재 회원의 찜하기 목록 조회
        return wishData;
    }

    const putChangeWish = (storeId) => { // 특정 가게 찜하기 상태 변경
        fetch(`http://15.165.26.32:8080/wish/change/${storeId}`, {
            method: "PUT",
            headers : {
                "Content-Type" : "application/json; charset=utf-8",
              },
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
                return response.json;
            }
        })
        .catch((error) => {
            // Handle errors here
            console.error('Fetch error:', error);
        });
    } 

    const getWishStateByStoreId = (storeId) => { // 현재 회원의 특정가게 찜 유무 조회

        fetch(`http://15.165.26.32:8080/wish/state/${storeId}`, {
            method : "GET",
            headers : {
              "Content-Type" : "application/json; charset=utf-8",
            },
          }) 
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
              return response.json;
            }
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            // Handle errors here
            console.error('Fetch error:', error);
          });


        // return true;
        // return false;
    }
  return {
    getWishList,
    putChangeWish,
    getWishStateByStoreId
  };
};

export default useWishHook;

import { useState } from "react";
import storeData from "./StoreList.json";

const useStoreHook = () => {
  const [stores, setStores] = useState(storeData);

  // 모든 가게 정보 가져오기
  /*
[
  {
    "id": 18,
    "name": "Restaurant A",
    "adress": "123 Main St",
    "city": "City A",
    "img": "image1.jpg"
  },
  {
    "id": 19,
    "name": "Cafe B",
    "adress": "456 Oak St",
    "city": "City B",
    "img": "image2.jpg"
  }
]
  */

async function getWishListByUserId(userId) {
  try {
    const response = await fetch(`http://localhost:8080/wishes/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const wishList = await response.json();
    return wishList;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return []; // 오류가 발생한 경우 빈 배열을 반환
  }
}

  const getAllStores = () => {
    return stores;
  };

  const getStoreListByCondition = (city) => {
    // fetch (`http://15.165.26.32:8080/stores/condition?city=${city}`, {
    //   method : 'GET',
    //   headers : {
    //     "Content-Type" : "application/json"
    //   },
    //   credentials : 'include'
      
    // })
    // .then((response) => {
    //   return Response.json();
    // })

    return storeData;
  };

  const getXYByKeyword = (address) => {
    fetch(
      `https://dapi.kakao.com/v2/local/search/query.${address}&category_group_code.FD6`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK 48f52f09b5313cba31a0459b42baaa2b`,
        },
      }
    ).then((response) => {
      return Response.json();
    });
  };

  // 홈화면에 사용할 특정 가게

  // 특정 가게 ID에 해당하는 가게 정보 가져오기
  const getStoreById = (storeId) => {
    return stores.find((store) => store.storeId === storeId);
  };

  // 특정 가게 정보 업데이트 (예시: 평점 업데이트)
  const updateStore = (updatedStore) => {
    setStores(
      stores.map((store) =>
        store.storeId === updatedStore.storeId ? updatedStore : store
      )
    );
  };

  // 새 가게 추가 (예시)
  const addStore = (newStore) => {
    setStores([...stores, { ...newStore, storeId: Date.now().toString() }]);
  };

  // 가게 삭제 (예시)
  const deleteStore = (storeId) => {
    setStores(stores.filter((store) => store.storeId !== storeId));
  };

  return {
    stores,
    getAllStores,
    getStoreById,
    updateStore,
    addStore,
    deleteStore,
    getStoreListByCondition,
    getWishListByUserId,
  };
};

export default useStoreHook;

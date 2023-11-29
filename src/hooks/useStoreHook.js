import { useState } from "react";
import storeData from "./StoreList.json";

const useStoreHook = () => {
  const [stores, setStores] = useState(storeData);

  // 모든 가게 정보 가져오기
  const getAllStores = () => {
    return stores;
  };

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
  };
};

export default useStoreHook;

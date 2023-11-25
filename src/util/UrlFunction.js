// URL에서 쿼리 파라미터를 추출하는 함수
export const getQueryParam = (location, paramName) => {
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get(paramName);
};

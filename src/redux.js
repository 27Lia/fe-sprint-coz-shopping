// // src/redux.js
import data from "./data.json";

// 상품 목록을 불러오는 액션 타입 정의
export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const INCREMENT_PAGE = "INCREMENT_PAGE";

// 상품 목록을 불러오는 액션 생성 함수
export const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});

// 페이지 증가 액션 생성 함수
export const incrementPage = () => ({
  type: INCREMENT_PAGE,
});

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

const initialState = {
  isLoggedIn: false, // 로그인 상태
  products: [], // 상품 목록 상태
  currentPage: 0, // 현재 페이지 정보
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case LOAD_PRODUCTS:
      return { ...state, products: [...state.products, ...action.payload] };
    case INCREMENT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default:
      return state;
  }
};

export const fetchProducts = () => {
  return (dispatch, getState) => {
    const { currentPage } = getState(); // 현재 페이지 번호를 가져옵니다.
    const productsPerPage = 4; // 페이지 당 상품 수를 10으로 설정
    const startIndex = currentPage * productsPerPage; // 시작 인덱스 계산
    const newProducts = data.slice(startIndex, startIndex + productsPerPage); // 새 상품 목록을 추출

    dispatch(loadProducts(newProducts));
    dispatch(incrementPage()); // 페이지 번호 증가 처리
  };
};

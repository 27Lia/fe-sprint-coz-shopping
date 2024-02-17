// // src/redux.js
import data from "./data.json";

// 상품 목록을 불러오는 액션 타입 정의
export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// 상품 목록을 불러오는 액션 생성 함수
export const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

const initialState = {
  isLoggedIn: false, // 로그인 상태
  products: [], // 상품 목록 상태
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case LOAD_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(loadProducts(data));
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
};

import data from "./data.json";

// 상품 목록을 불러오는 액션 타입 정의
export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const INCREMENT_PAGE = "INCREMENT_PAGE";
export const RESET_PAGE = "RESET_PAGE";
export const RESET_PRODUCTS = "RESET_PRODUCTS";

// 페이지 번호를 초기화하는 액션 생성 함수
export const resetPage = () => ({
  type: RESET_PAGE,
});

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
export const resetProducts = () => ({ type: RESET_PRODUCTS });

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
      return {
        ...state,
        products: action.payload.reset
          ? action.payload.products
          : [...state.products, ...action.payload.products],
      };
    case INCREMENT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case RESET_PAGE:
      return { ...state, currentPage: 0 };
    case RESET_PRODUCTS:
      return { ...state, products: [] };
    default:
      return state;
  }
};

export const fetchProducts = (filterOption) => (dispatch, getState) => {
  const { currentPage } = getState();
  const productsPerPage = 10;
  const startIndex = currentPage * productsPerPage;

  if (startIndex >= data.length) return;

  const filteredData =
    filterOption === "전체"
      ? data
      : data.filter((product) => product.type === filterOption);
  const newProducts = filteredData.slice(
    startIndex,
    startIndex + productsPerPage
  );

  dispatch(loadProducts({ products: newProducts, reset: currentPage === 0 }));
  dispatch(incrementPage());
};

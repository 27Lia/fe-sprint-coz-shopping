// src/redux.js
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOAD_DATA = "LOAD_DATA";
export const UPDATE_DATA = "UPDATE_DATA";

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

// 액션 생성 함수
export const loadData = (data) => ({
  type: LOAD_DATA,
  payload: data,
});

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});

const initialState = {
  isLoggedIn: false,
  data: [], // JSON 데이터를 저장할 상태
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case LOAD_DATA:
      return { ...state, data: action.payload };
    case UPDATE_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

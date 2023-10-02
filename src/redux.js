// src/redux.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

const initialState = {
    isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoggedIn: true };
        case LOGOUT:
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
};

// src/store.js
import { createStore } from 'redux';
import { userReducer } from './redux';

const store = createStore(userReducer);

export default store;

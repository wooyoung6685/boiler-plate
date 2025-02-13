import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user_reducer";

const rootReducer = combineReducers({
  user: userReducer, // 'user' 키로 userReducer를 등록
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";

import authReducer, { AUTH_LOGOUT } from "./auth/authSlice";
import forgotPasswordReducer from "./auth/forgotPasswordSlice";
import userReducer from "./user/userSlice";
import groupReducer from "./group/groupSlice";
import notificationReducer from "./notification/notificationSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
  group: groupReducer,
  notification: notificationReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === `${AUTH_LOGOUT}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

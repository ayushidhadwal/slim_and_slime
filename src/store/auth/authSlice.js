import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import { SESSION_TOKEN } from "../../constants/common";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotifications";

const AUTH_RESTORE = "auth/restore";
export const AUTH_LOGOUT = "auth/logout";
const AUTH_LOGIN = "auth/login";
const AUTH_REGISTER = "auth/register";

export const restoreSession = createAsyncThunk(AUTH_RESTORE, async () => {
  return await SecureStore.getItemAsync(SESSION_TOKEN);
});

export const logout = createAsyncThunk(AUTH_LOGOUT, async () => {
  await SecureStore.deleteItemAsync(SESSION_TOKEN);
  return true;
});

export const login = createAsyncThunk(
  AUTH_LOGIN,
  async ({ email, password }) => {
    const fd = new FormData();

    const token = await registerForPushNotificationsAsync();

    fd.append("email", email);
    fd.append("password", password);
    fd.append("platform", Platform.OS);
    fd.append("fcmtoken", token);

    const result = await axios.post("/api/login", fd);
    if (result.data.status) {
      await SecureStore.setItemAsync(
        SESSION_TOKEN,
        String(result.data.data.id)
      );
      return result.data;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const register = createAsyncThunk(
  AUTH_REGISTER,
  async ({ name, email, password, height, weight, gender, unit }) => {
    const fd = new FormData();

    const token = await registerForPushNotificationsAsync();

    fd.append("name", name);
    fd.append("email", email);
    fd.append("password", password);
    fd.append("height", height);
    fd.append("weight", weight);
    fd.append("gender", gender?.toLowerCase());
    fd.append("unit", unit);
    fd.append("platform", Platform.OS);
    fd.append("fcmtoken", token);

    const result = await axios.post("/api/register", fd);
    if (result.data.status) {
      await SecureStore.setItemAsync(
        SESSION_TOKEN,
        String(result.data.data.id)
      );
      return result.data;
    } else {
      throw new Error(result.data.message);
    }
  }
);

const reducers = {
  startLoading: (state) => {
    state.isLoading = true;
  },
  authUser: (state, action) => {
    state.isLoading = false;
    const { data } = action.payload;
    state.userId = data.id;
    state.emailVerifiedAt = data.email_verified_at;
  },
  stopLoading: (state) => {
    state.isLoading = false;
  },
  startSessionLoading: (state) => {
    state.isSessionLoading = true;
  },
  stopSessionLoading: (state) => {
    state.isSessionLoading = false;
  },
  restoreSession: (state, action) => {
    state.isSessionLoading = false;
    state.userId = action.payload;
  },
};

const initialState = {
  userId: null,
  emailVerifiedAt: null,
  isLoading: false,
  isSessionLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, reducers.startLoading);
    builder.addCase(register.fulfilled, reducers.authUser);
    builder.addCase(register.rejected, reducers.stopLoading);

    builder.addCase(login.pending, reducers.startLoading);
    builder.addCase(login.fulfilled, reducers.authUser);
    builder.addCase(login.rejected, reducers.stopLoading);

    builder.addCase(restoreSession.pending, reducers.startSessionLoading);
    builder.addCase(restoreSession.fulfilled, reducers.restoreSession);
    builder.addCase(restoreSession.rejected, reducers.stopSessionLoading);
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;

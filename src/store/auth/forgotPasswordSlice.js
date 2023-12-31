import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendCode = createAsyncThunk(
  "forgotPassword/sendCode",
  async ({ email }) => {
    const fd = new FormData();
    fd.append("email", email);

    const result = await axios.post("/api/forget-password-otp-email", fd);
    if (result.data.status) {
      return result.data;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "forgotPassword/verifyCode",
  async ({ code }, { getState }) => {
    const { userId } = getState().forgotPassword;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("otp", code);

    const result = await axios.post("/api/verify-password-otp", fd);
    if (result.data.status) {
      return true;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "forgotPassword/resetPassword",
  async ({ password, confirmPassword }, { getState }) => {
    const { userId } = getState().forgotPassword;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("password", password);
    fd.append("confirm_password", confirmPassword);

    const result = await axios.post("/api/change-password", fd);
    if (result.data.status) {
      return {
        data: {
          userId: null,
          code: "",
        },
      };
    } else {
      throw new Error(result.data.message);
    }
  }
);

const initialState = {
  userId: null,
  code: "",
  isLoading: false,
};

const reducers = {
  startLoading: (state) => {
    state.isLoading = true;
  },
  setData: (state, action) => {
    state.isLoading = false;
    const {
      data: { user_id, otp },
    } = action.payload;

    state.userId = user_id;
    state.code = otp;
  },
  stopLoading: (state) => {
    state.isLoading = false;
  },
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendCode.pending, reducers.startLoading);
    builder.addCase(sendCode.fulfilled, reducers.setData);
    builder.addCase(sendCode.rejected, reducers.stopLoading);

    builder.addCase(verifyCode.pending, reducers.startLoading);
    builder.addCase(verifyCode.fulfilled, reducers.stopLoading);
    builder.addCase(verifyCode.rejected, reducers.stopLoading);

    builder.addCase(resetPassword.pending, reducers.startLoading);
    builder.addCase(resetPassword.fulfilled, reducers.setData);
    builder.addCase(resetPassword.rejected, reducers.stopLoading);
  },
});

export const {} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GET_NOTIFICATIONS = "notification/get";

export const getNotifications = createAsyncThunk(
  GET_NOTIFICATIONS,
  async (_, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(`/api/user-notification/${userId}`);

    if (result.data.status) {
      return result.data.data ? result.data.data : [];
    } else {
      throw new Error(result.data.message);
    }
  }
);

const initialState = {
  notifications: [],
  isLoading: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload.map((item) => ({
        id: item.id,
        title: item.title,
        message: item.notifications,
        datetime: item.created_at,
      }));
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;

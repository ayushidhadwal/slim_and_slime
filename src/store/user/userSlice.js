import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { kilometerToMiles, UNITS } from "../../utils/fitness";

const GET_USER_PROFILE = "user/getProfile";
const UPDATE_USER_PASSWORD = "user/updatePassword";
const UPDATE_USER_PROFILE = '"user/updateProfile"';
const UPDATE_USER_FITNESS_RECORD = "user/update-fitness-record";
const GET_USER_FITNESS_RECORD = "user/get-fitness-record";
const DELETE_USER_ACCOUNT = "user/delete-user-account";

export const getFitnessRecord = createAsyncThunk(
  GET_USER_FITNESS_RECORD,
  async ({ filter }, { getState }) => {
    const { userId } = getState().auth;
    const { unit } = getState().user;

    const result = await axios.get(`api/get-user-record/${userId}/${filter}`);
    if (result.data.status) {
      const {
        todaySteps,
        todayCalories,
        todayDistance,
        averageStepsInAWeek,
        graphData,
      } = result.data.data;
      let limit = 1000;
      const graph = [];
      const axisLabels = [];
      const axisValues = [];

      let loopLimit = 12;
      if (filter === "month") {
        loopLimit = moment().daysInMonth();
      }

      for (let i = 0; i < loopLimit; i++) {
        let x = moment(i + 1, "M").format("MMM");
        if (filter === "month") {
          x = moment(
            `${i + 1}${moment().format("/MM/YYYY")}`,
            "D/MM/YYYY"
          ).format("DD MMM");
        }

        const item = graphData.find((d) => {
          let cond = d.timeframe === moment(i + 1, "M").format("MMMM");

          if (filter === "month") {
            cond =
              d.timeframe ===
              moment(
                `${i + 1}${moment().format("/MM/YYYY")}`,
                "D/MM/YYYY"
              ).format("YYYY-MM-DD");
          }
          return cond;
        });

        const y = item?.steps ? Number(item?.steps) : 0;
        const obj = { x, y };
        graph.push(obj);
        axisLabels.push(x);
        axisValues.push(y);
      }

      const max = Math.max(...axisValues);
      if (max > limit) {
        limit = max;
      }

      const graphClone = graph.map((item) => ({
        x: item.x,
        y: limit - item.y,
      }));

      return {
        todaySteps: todaySteps,
        todayCalories: todayCalories,
        todayDistance:
          unit === UNITS.IMPERIAL
            ? kilometerToMiles(Number(todayDistance))
            : todayDistance,
        averageStepsInAWeek: averageStepsInAWeek,
        graph: {
          graphClone,
          graph,
          axisLabels,
        },
      };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const updateFitnessRecord = createAsyncThunk(
  UPDATE_USER_FITNESS_RECORD,
  async ({ steps, distance, calories }, { getState }) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("steps_taken", String(steps));
    fd.append("calories_burnt", String(calories));
    fd.append("distance", String(distance));

    const result = await axios.post("/api/insert-record", fd);

    if (result.data.status) {
      return {
        lastUpdatedAt: new Date().toUTCString(),
      };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  GET_USER_PROFILE,
  async (_, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(`/api/user-details/${userId}/last-record`);
    if (result.data.status) {
      const lastUpdatedAt = result.data.data?.last_record?.updated_at;

      return {
        data: {
          name: result.data.data.username,
          email: result.data.data.useremail,
          profilePic: result.data.data.profile_pic,
          height: result.data.data.height,
          weight: result.data.data.weight,
          gender: result.data.data.gender?.toUpperCase(),
          unit: result.data.data.unit,
          lastUpdatedAt: lastUpdatedAt
            ? lastUpdatedAt
            : new Date(new Date().setUTCHours(0, 0, 0, 0)).toUTCString(),
        },
      };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  UPDATE_USER_PASSWORD,
  async ({ oldPassword, password, confirmPassword }, { getState }) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("old_password", oldPassword);
    fd.append("new_password", password);
    fd.append("confirm_password", confirmPassword);

    const result = await axios.post("/api/change-password-in-profile", fd);
    if (result.data.status) {
      return true;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  UPDATE_USER_PROFILE,
  async (
    { name, email, profilePic, height, weight, gender, unit },
    { getState }
  ) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("height", height);
    fd.append("weight", weight);
    fd.append("unit", unit);
    fd.append("gender", gender.toLowerCase());
    if (profilePic?.name) {
      fd.append("profile_image", profilePic);
    }

    const result = await axios.post("/api/profile-update", fd);
    if (result.data.status) {
      return result.data;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  DELETE_USER_ACCOUNT,
  async ({ password }, { getState }) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("password", password);

    const result = await axios.post("/api/delete-user", fd);
    if (result.data.status) {
      return true;
    } else {
      throw new Error(result.data.message);
    }
  }
);

const reducers = {
  startLoading: (state) => {
    state.isLoading = true;
  },
  setData: (state, action) => {
    state.isLoading = false;
    const {
      data: { name, email, profile_pic, height, weight, gender, unit },
    } = action.payload;

    state.name = name;
    state.email = email;
    state.height = height;
    state.weight = weight;
    state.unit = unit?.toUpperCase();
    state.gender = gender?.toUpperCase();
    state.profilePic = profile_pic;
  },
  stopLoading: (state) => {
    state.isLoading = false;
  },
  setProfileData: (state, action) => {
    state.isLoading = false;
    const {
      data: {
        name,
        email,
        profilePic,
        height,
        weight,
        gender,
        lastUpdatedAt,
        unit,
      },
    } = action.payload;

    state.name = name;
    state.email = email;
    state.profilePic = profilePic;
    state.height = height;
    state.weight = weight;
    state.unit = unit?.toUpperCase();
    state.gender = gender;
    state.fitnessRecord.lastUpdatedAt = lastUpdatedAt;
  },
  setFitnessData: (state, action) => {
    const { lastUpdatedAt } = action.payload;
    state.fitnessRecord.lastUpdatedAt = lastUpdatedAt;
  },
  setGraphData: (state, action) => {
    state.isLoading = false;

    const {
      todaySteps,
      todayCalories,
      todayDistance,
      averageStepsInAWeek,
      graph,
    } = action.payload;

    state.fitnessRecord.todaySteps = Number(todaySteps);
    state.fitnessRecord.todayCalories = Number(todayCalories);
    state.fitnessRecord.todayDistance = Number(todayDistance);
    state.fitnessRecord.averageStepsInAWeek = Math.round(
      Number(averageStepsInAWeek)
    );
    state.fitnessRecord.graph = graph;
  },
};

const initialState = {
  name: "",
  email: "",
  profilePic: "",
  height: "",
  weight: "",
  unit: "",
  gender: "",
  fitnessRecord: {
    isLoading: true,
    todaySteps: 0,
    todayCalories: 0,
    todayDistance: 0,
    averageStepsInAWeek: 0,
    graph: {
      graphClone: [],
      graph: [],
      axisLabels: [],
    },
    lastUpdatedAt: null,
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, reducers.startLoading);
    builder.addCase(getProfile.fulfilled, reducers.setProfileData);
    builder.addCase(getProfile.rejected, reducers.stopLoading);

    builder.addCase(updatePassword.pending, reducers.startLoading);
    builder.addCase(updatePassword.fulfilled, reducers.stopLoading);
    builder.addCase(updatePassword.rejected, reducers.stopLoading);

    builder.addCase(updateProfile.pending, reducers.startLoading);
    builder.addCase(updateProfile.fulfilled, reducers.setData);
    builder.addCase(updateProfile.rejected, reducers.stopLoading);

    builder.addCase(deleteAccount.pending, reducers.startLoading);
    builder.addCase(deleteAccount.fulfilled, reducers.stopLoading);
    builder.addCase(deleteAccount.rejected, reducers.stopLoading);

    builder.addCase(updateFitnessRecord.fulfilled, reducers.setFitnessData);

    builder.addCase(getFitnessRecord.pending, reducers.startLoading);
    builder.addCase(getFitnessRecord.fulfilled, reducers.setGraphData);
    builder.addCase(getFitnessRecord.rejected, reducers.stopLoading);
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

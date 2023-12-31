import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GET_GROUPS = "group/all-groups";
const GET_SEARCHED_GROUPS = "group/search-groups";
const GET_MY_GROUPS = "group/my-groups";
const CREATE_GROUP = "group/create";
const EDIT_GROUP = "group/edit";
const DELETE_GROUP = "group/delete";
const LEAVE_GROUP = "group/leave";
const JOIN_GROUP = "group/join";
const REMOVE_GROUP_MEMBER = "group/remove-group-member";
const GET_GROUP_DETAILS = "group/details";

export const getGroups = createAsyncThunk(
  GET_GROUPS,
  async (_, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(`/api/all-groups/${userId}`);
    if (result.data.status) {
      return { data: result.data.data ? result.data.data : [], userId };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const getSearchedGroups = createAsyncThunk(
  GET_SEARCHED_GROUPS,
  async (searchQuery, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(
      `api/group-search/${userId}/${encodeURIComponent(searchQuery)}`
    );
    if (result.data.status) {
      return { data: result.data.data ? result.data.data : [], userId };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const getMyGroups = createAsyncThunk(
  GET_MY_GROUPS,
  async (searchQuery, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(`api/group-list-by-userid/${userId}`);

    if (result.data.status) {
      return { data: result.data.data ? result.data.data : [], userId };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const createGroup = createAsyncThunk(
  CREATE_GROUP,
  async (
    { name, desc, groupImage, numberOfMembers, privacy, coverImage },
    { getState }
  ) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("name", name);
    fd.append("description", desc);
    fd.append("number_of_members", numberOfMembers);
    fd.append("public", privacy === "PUBLIC" ? "1" : "0");
    fd.append("private", privacy === "PRIVATE" ? "1" : "0");
    fd.append("group_image", groupImage);
    fd.append("group_image1", coverImage);

    const result = await axios.post(`api/insert-group`, fd);

    if (result.data.status) {
      return true;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  EDIT_GROUP,
  async (
    { id, name, desc, groupImage, numberOfMembers, privacy, coverImage },
    { getState }
  ) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("group_id", id);
    fd.append("name", name);
    fd.append("description", desc);
    fd.append("number_of_members", numberOfMembers);
    fd.append("public", privacy === "PUBLIC" ? "1" : "0");
    fd.append("private", privacy === "PRIVATE" ? "1" : "0");
    if (groupImage.name) {
      fd.append("group_image", groupImage);
    }

    if (coverImage.name) {
      fd.append("group_image1", coverImage);
    }

    const result = await axios.post(`api/update-group`, fd);

    if (result.data.status) {
      return {
        id,
        name,
        desc,
        numberOfMembers,
        privacy,
        groupImage: groupImage.uri,
        coverImage: coverImage.uri,
      };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  DELETE_GROUP,
  async ({ id }, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(`api/delete-group/${userId}/${id}`);

    if (result.data.status) {
      return id;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const leaveGroup = createAsyncThunk(
  LEAVE_GROUP,
  async ({ id }, { getState }) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("group_id", id);

    const result = await axios.post(`api/remove-group`, fd);

    if (result.data.status) {
      return id;
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const joinGroup = createAsyncThunk(
  JOIN_GROUP,
  async ({ id, privacy }, { getState }) => {
    const { userId } = getState().auth;

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("group_id", id);

    const result = await axios.post(`api/join-group`, fd);

    if (result.data.status) {
      return { id, privacy };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const removeGroupMember = createAsyncThunk(
  REMOVE_GROUP_MEMBER,
  async ({ groupId, memberId }, { getState }) => {
    const { userId } = getState().auth;
    const result = await axios.get(
      `api/private-group-kick/${userId}/${memberId}/${groupId}`
    );

    if (result.data.status) {
      return { groupId, memberId };
    } else {
      throw new Error(result.data.message);
    }
  }
);

export const getGroupDetails = createAsyncThunk(
  GET_GROUP_DETAILS,
  async ({ groupId }, { getState }) => {
    const { userId } = getState().auth;

    const result = await axios.get(`api/group-details/${groupId}/${userId}`);

    if (result.data.status) {
      const requestResult = await axios.get(
        `api/private-group-request-list-by-group-id/${userId}/${groupId}`
      );

      if (requestResult.data.status) {
        return {
          data: result.data.data,
          userId,
          joinRequests: requestResult.data.data,
        };
      } else {
        throw new Error(result.data.message);
      }
    } else {
      throw new Error(result.data.message);
    }
  }
);

const reducers = {
  startMyGroupLoading: (state) => {
    state.myGroups.isLoading = true;
  },
  stopMyGroupLoading: (state) => {
    state.myGroups.isLoading = false;
  },
  addMyGroups: (state, action) => {
    const { data, userId } = action.payload;

    state.myGroups.isLoading = false;

    state.myGroups.data = data.map((item) => ({
      id: item.id,
      name: item.name,
      desc: item.description,
      image: item.group_image,
      coverImage: item.group_image1,
      numberOfMembers: item.number_of_members,
      isJoined: item.joined,
      isOwner: Number(item.user_id) === Number(userId),
      privacy: item.private === 0 ? "PUBLIC" : "PRIVATE",
    }));
  },
  deleteMyGroup: (state, action) => {
    state.isLoading = false;
    state.myGroups.data = state.myGroups.data.filter(
      (item) => +item.id !== +action.payload
    );
  },
  leaveGroup: (state, action) => {
    /* For my groups */
    state.isLoading = false;
    const index = state.myGroups.data.findIndex(
      (item) => +item.id === +action.payload
    );
    if (index >= 0) {
      state.myGroups.data[index].isJoined = false;
    }

    /* For all groups */
    const i2 = state.groups.data.findIndex(
      (item) => +item.id === +action.payload
    );
    if (i2 >= 0) {
      state.groups.data[i2].isJoined = false;
    }

    /* For searched groups */
    const i3 = state.searchedGroups.data.findIndex(
      (item) => +item.id === +action.payload
    );
    if (i3 >= 0) {
      state.searchedGroups.data[i3].isJoined = false;
    }
  },
  startGroupLoading: (state) => {
    state.groups.isLoading = true;
  },
  stopGroupLoading: (state) => {
    state.groups.isLoading = false;
  },
  addGroups: (state, action) => {
    const { data, userId } = action.payload;

    state.groups.isLoading = false;

    state.groups.data = data.map((item) => ({
      id: item.id,
      name: item.name,
      desc: item.description,
      image: item.group_image,
      coverImage: item.group_image1,
      numberOfMembers: item.number_of_members,
      isJoined: item.joined,
      isOwner: Number(item.user_id) === Number(userId),
      privacy: item.private === 0 ? "PUBLIC" : "PRIVATE",
    }));
  },
  startSearchGroupLoading: (state) => {
    state.searchedGroups.isLoading = true;
  },
  stopSearchGroupLoading: (state) => {
    state.searchedGroups.isLoading = false;
  },
  addSearchedGroups: (state, action) => {
    const { data, userId } = action.payload;

    state.searchedGroups.isLoading = false;

    state.searchedGroups.data = data.map((item) => ({
      id: item.id,
      name: item.name,
      desc: item.description,
      image: item.group_image,
      coverImage: item.group_image1,
      numberOfMembers: item.number_of_members,
      isJoined: item.joined,
      isOwner: Number(item.user_id) === Number(userId),
      privacy: item.private === 0 ? "PUBLIC" : "PRIVATE",
    }));
  },
  joinGroup: (state, action) => {
    const { id, privacy } = action.payload;
    if (privacy === "PRIVATE") {
      return state;
    }
    /* For my groups */
    const index = state.myGroups.data.findIndex((item) => +item.id === +id);
    if (index >= 0) {
      state.myGroups.data[index].isJoined = true;
    }

    /* For all groups */
    const i2 = state.groups.data.findIndex((item) => +item.id === +id);
    if (i2 >= 0) {
      state.groups.data[i2].isJoined = true;
    }

    /* For searched groups */
    const i3 = state.searchedGroups.data.findIndex((item) => +item.id === +id);
    if (i3 >= 0) {
      state.searchedGroups.data[i3].isJoined = true;
    }
  },
  startCommonLoading: (state) => {
    state.isLoading = true;
  },
  stopCommonLoading: (state) => {
    state.isLoading = false;
  },
  removeGroupMember: (state, action) => {
    const { groupId, memberId } = action.payload;
    if (groupId === state.groupDetails.id) {
      state.groupDetails.members = state.groupDetails.members.filter(
        (item) => +item.id !== +memberId
      );
    }
  },
  startGroupDetailsLoading: (state) => {
    state.myGroups.isLoading = true;
  },
  stopGroupDetailsLoading: (state) => {
    state.myGroups.isLoading = false;
  },
  setGroupDetails: (state, action) => {
    state.myGroups.isLoading = false;
    const {
      data: {
        id,
        name,
        description,
        number_of_members,
        group_image,
        group_image1,
        joined,
        user_id,
        private: privacy,
        users_in_this_group,
      },
      userId,
    } = action.payload;

    state.groupDetails = {
      id: id,
      name: name,
      desc: description,
      image: group_image,
      coverImage: group_image1,
      numberOfMembers: number_of_members,
      isJoined: joined,
      isOwner: Number(user_id) === Number(userId),
      privacy: privacy === 0 ? "PUBLIC" : "PRIVATE",
      members: users_in_this_group.map((item) => ({
        id: item.user_id,
        name: item.username,
        profilePic: item.profile_pic,
        stepsTotal: item.user_steps_total ? item.user_steps_total : 0,
        isOwner: Number(item.user_id) === Number(userId),
      })),
    };
  },
};

const initialState = {
  groups: { isLoading: true, data: [] },
  myGroups: { isLoading: true, data: [] },
  searchedGroups: { isLoading: true, data: [] },
  isLoading: false,
  groupDetails: {
    id: null,
    name: "",
    desc: "",
    image: "",
    coverImage: "",
    numberOfMembers: "",
    isJoined: false,
    isOwner: false,
    privacy: "PUBLIC",
    members: [],
    joinRequests: [],
  },
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all groups
    builder.addCase(getGroups.pending, reducers.startGroupLoading);
    builder.addCase(getGroups.fulfilled, reducers.addGroups);
    builder.addCase(getGroups.rejected, reducers.stopGroupLoading);

    // Get searched groups
    builder.addCase(
      getSearchedGroups.pending,
      reducers.startSearchGroupLoading
    );
    builder.addCase(getSearchedGroups.fulfilled, reducers.addSearchedGroups);
    builder.addCase(
      getSearchedGroups.rejected,
      reducers.stopSearchGroupLoading
    );

    // Get my groups
    builder.addCase(getMyGroups.pending, reducers.startMyGroupLoading);
    builder.addCase(getMyGroups.fulfilled, reducers.addMyGroups);
    builder.addCase(getMyGroups.rejected, reducers.stopMyGroupLoading);

    // create group
    builder.addCase(createGroup.pending, reducers.startMyGroupLoading);
    builder.addCase(createGroup.fulfilled, reducers.stopMyGroupLoading);
    builder.addCase(createGroup.rejected, reducers.stopMyGroupLoading);

    // Update group
    builder.addCase(updateGroup.pending, reducers.startMyGroupLoading);
    builder.addCase(updateGroup.fulfilled, reducers.stopMyGroupLoading);
    builder.addCase(updateGroup.rejected, reducers.stopMyGroupLoading);

    // Delete Group
    builder.addCase(deleteGroup.pending, reducers.startCommonLoading);
    builder.addCase(deleteGroup.fulfilled, reducers.deleteMyGroup);
    builder.addCase(deleteGroup.rejected, reducers.stopCommonLoading);

    // leave group
    builder.addCase(leaveGroup.pending, reducers.startCommonLoading);
    builder.addCase(leaveGroup.fulfilled, reducers.leaveGroup);
    builder.addCase(leaveGroup.rejected, reducers.stopCommonLoading);

    // remove group member
    builder.addCase(removeGroupMember.fulfilled, reducers.removeGroupMember);

    // Join public group
    builder.addCase(joinGroup.pending, reducers.startMyGroupLoading);
    builder.addCase(joinGroup.fulfilled, reducers.joinGroup);
    builder.addCase(joinGroup.rejected, reducers.stopMyGroupLoading);

    // Get group info
    builder.addCase(getGroupDetails.pending, reducers.startGroupDetailsLoading);
    builder.addCase(getGroupDetails.fulfilled, reducers.setGroupDetails);
    builder.addCase(getGroupDetails.rejected, reducers.stopGroupDetailsLoading);
  },
});

export const {} = groupSlice.actions;

export default groupSlice.reducer;

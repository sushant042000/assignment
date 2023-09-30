import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  token: null,
  allUsers: null,
  userData: null,
  error: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      (state.loading = true); (state.token = null);(state.error = null);
    },
    loginSuccess: (state, action) => {
      (state.loading = false);
        (state.token = action.payload);
        (state.error = null);
    },
    loginFailed: (state, action) => {
      (state.loading = false);
        (state.token = null);
        (state.error = action.payload);
    },

    getAllUserStart: (state) => {
      (state.loading = true);
      (state.error = null);
      state.allUsers = null;
    },
    getAllUserSuccess: (state, action) => {
      (state.loading = false); 
      (state.allUsers = action.payload);
      state.error = null;
    },
    getAllUserFail: (state, action) => {
      (state.loading = false);
       (state.allUsers = null);
      state.error = action.payload;
    },
    getSingleUserStart: (state) => {
      (state.loading = true);
      (state.userData = null);
      state.error = null;
    },
    getSingleUserSuccess: (state, action) => {
      (state.loading = false);
      (state.userData = action.payload);
      state.error = null;
    },
    getSingleUserFail: (state, action) => {
      (state.loading = false);
        (state.userData = null);
        (state.error = action.payload);
    },
  },
});

export const {
  getAllUserStart,
  getAllUserSuccess,
  getAllUserFail,
  getSingleUserStart,
  getSingleUserSuccess,
  getSingleUserFail,
  loginStart,
  loginSuccess,
  loginFailed,
} = user.actions;

export default user.reducer;

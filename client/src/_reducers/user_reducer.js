import { createSlice } from "@reduxjs/toolkit";
import { auth, loginUser, registerUser } from "../_actions/user_actions";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginSuccess = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginSuccess = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerSuccess = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerSuccess = false;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(auth.rejected, (state, action) => {
        state.userData = null;
      });
  },
});

export default userSlice.reducer;

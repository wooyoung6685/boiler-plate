import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios 기본 URL 설정
axios.defaults.baseURL = "http://localhost:5001";

export const loginUser = createAsyncThunk(
  "user/login",
  async (dataToSubmit) => {
    const response = await axios.post("/api/users/login", dataToSubmit, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (dataToSubmit) => {
    const response = await axios.post("/api/users/register", dataToSubmit, {
      withCredentials: true,
    });
    return response.data;
  }
);

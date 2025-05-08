import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const res = await fetch('/api/users', {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const res = await fetch("/api/users/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/users/logout"); // <-- fixed URL
      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }
      const data = await res.json();
      localStorage.removeItem("user");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Something went wrong";
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Something went wrong";
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload || "Something went wrong during logout";
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

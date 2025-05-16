import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// CREATE room
export const createRoom = createAsyncThunk("room/create", async (roomData, thunkAPI) => {
  try {
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(roomData)
    });

    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || "Failed to create room");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Unexpected error");
  }
});

// GET all rooms
export const getRooms = createAsyncThunk("room/getAll", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/rooms");
    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch rooms");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Unexpected error");
  }
});

const initialState = {
  rooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Room
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Rooms
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;

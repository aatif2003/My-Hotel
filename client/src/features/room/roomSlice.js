import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CREATE room
export const createRoom = createAsyncThunk("room/create", async (roomData, thunkAPI) => {
  try {
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
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

// UPDATE room
export const updateRoom = createAsyncThunk("room/update", async ({ id, roomData }, thunkAPI) => {
  try {
    const res = await fetch(`/api/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || "Failed to update room");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Unexpected error");
  }
});

// DELETE room
export const deleteRoom = createAsyncThunk("room/delete", async (id, thunkAPI) => {
  try {
    const res = await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || "Failed to delete room");
    }
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Unexpected error");
  }
});

const initialState = {
  rooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
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
      })

      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.rooms.findIndex(room => room._id === action.payload._id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = state.rooms.filter(room => room._id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;

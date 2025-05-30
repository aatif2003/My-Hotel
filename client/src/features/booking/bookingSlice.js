import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      // POST to /api/bookings with all booking data in body
      const response = await axios.post('/api/bookings', bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // include cookies if needed
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Initial state
const initialState = {
  booking: null,
  isLoading: false,
  error: null,
};

// Slice definition
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBooking: (state) => {
      state.booking = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

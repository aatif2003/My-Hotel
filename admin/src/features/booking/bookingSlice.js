import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const response = await axios.post('/api/bookings', bookingData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const fetchBookingById = createAsyncThunk(
  "booking/getBbooking",
  async ( thunkAPI) => {
    try {
      const response = await axios.get(`/api/bookings`, {
        withCredentials: true,
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
  booking: [],
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
      // Existing createBooking handlers
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
      })
      
      // NEW: fetchBookingById handlers
      .addCase(fetchBookingById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
  
});


// Export actions and reducer
export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
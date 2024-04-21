import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, 
  user: null, 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export action creators
export const { setAuthenticated, setUser, clearAuthState } = authSlice.actions;

// Export reducer

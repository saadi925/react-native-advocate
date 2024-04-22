import { createSlice } from '@reduxjs/toolkit';
import { LawyerProfile, ProfileInput } from '../../../types/Cards';

type ROLE = 'CLIENT' | 'LAWYER'
type AuthState = {
  isAuthenticated : boolean,
  user : any,
  role :  ROLE | null
  profile : ProfileInput | null
  lawyerProfile : LawyerProfile | null
}

const initialState : AuthState = {
  isAuthenticated: false, 
  user: null, 
  role : null,
  profile : null,
  lawyerProfile : null
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
    setRole : (state, action : {
      payload : ROLE
    }) => {
      state.role = action.payload
    },
    setProfile : (state, action )=> {
      state.profile = action.payload
    },
    setLawyerProfile : (state, action )=> {
      state.lawyerProfile = action.payload
    }
  },
});

// Export action creators
export const { setAuthenticated, setUser, clearAuthState, setRole, setProfile } = authSlice.actions;

// Export reducer

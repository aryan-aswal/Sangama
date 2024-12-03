import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    loading: false,
    signupData: localStorage.getItem('signupData') ? JSON.parse(localStorage.getItem('signupData')) : {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading:  (state, action) => {
        state.loading = action.payload;
    },
    setUser: (state, action) => {
        state.user = action.payload;
    },
    setToken: (state, action) => {
        state.token = action.payload;
    },
    setSignUpData: (state, action) => {
      state.signupData = action.payload;
      localStorage.setItem('signupData', JSON.stringify(state.signupData));
    },
    getSignUpData: (state) => {
      return state.signupData;
    }
  },
})

export const { setLoading, setUser, setToken, setSignUpData } = authSlice.actions
export default authSlice.reducer
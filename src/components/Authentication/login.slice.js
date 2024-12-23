import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"login",
    initialState: {
        user:null,
      },
    reducers: {
        login: (state, action) =>{
            const user = action.payload;
            state.user = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                bio: user.bio,
            };
        },
        logout: (state) =>{
            state.user = null;
        },
        updateProfile: (state, action) => {
            const updatedProfile = action.payload;
            state.user = { ...state.user, ...updatedProfile };
          },
    },
});

export const { login, logout,updateProfile } = authSlice.actions;
export default authSlice.reducer;
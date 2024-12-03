import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import meetingSlice from "../slices/meetingSlice";

export const rootReducer = combineReducers({
    auth: authSlice,
    meeting: meetingSlice
})
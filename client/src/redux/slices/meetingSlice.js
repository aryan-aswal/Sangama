import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    details: localStorage.getItem('meetingDetails') ? JSON.parse(localStorage.getItem('meetingDetails')) : {},
}

export const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {
        setMeetingDetails: (state, action) => {
            state.details = action.payload;
        }
    }
})

export const { setMeetingDetails } = meetingSlice.actions
export default meetingSlice.reducer
import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { meeting_endpoints } from "../apis"
import { setMeetingDetails } from '../../redux/slices/meetingSlice'
const {
    FETCH_MEETING_DETAILS_API,
    CREATE_TOKEN_API,
    JOIN_MEETING_API,
    FETCH_MESSAGES_API
} = meeting_endpoints

export const createMeeting = (data, token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('POST', CREATE_TOKEN_API, data, { Authorization: `Bearer ${token}` });
            console.log("RESPONSE FROM CREATE MEETING...", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Meeting created successfully...");
            // dispatch(setMeetingDetails(response.data.data));
            // localStorage.setItem('meetingDetails', JSON.stringify(response.data.data));
            const meetingPath = response.data.data.meeting_link.split('/').at(-1);
            const meeting_room = response.data.data.room_name;
            navigate(`/meeting/${meeting_room}/${meetingPath}`);
        } catch (error) {
            console.log("ERROR OCCURRED AT CREATE MEETING API...", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const fetchMeetingDetails = (data, token) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('GET', FETCH_MEETING_DETAILS_API, null, {Authorization: `Bearer ${token}`}, data);
            console.log("RESPONSE FROM FETCH MEETING DETAILS...", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setMeetingDetails(response.data.data));
            localStorage.setItem('meetingDetails', JSON.stringify(response.data.data));
            return response.data.data;
        } catch (error) {
            console.log("ERROR OCCURRED AT FETCH MEETING DETAILS API...", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const joinMeeting = async(data, token) => {
    try {
        const response = await apiConnector('POST', JOIN_MEETING_API, data, {Authorization: `Bearer ${token}`});
        console.log("RESPONSE FROM JOIN MEETING...", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log("ERROR OCCURRED AT JOIN MEETING API...", error);
        toast.error(error.response.data.message);
    }
}

export const fetchMessages = async(data, token) => {
    try {
        console.log("DATA...", data);
        const response = await apiConnector('GET', FETCH_MESSAGES_API, null, {Authorization: `Bearer ${token}`}, data);
        console.log("RESPONSE FROM FETCH MESSAGES...", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log("ERROR OCCURRED AT FETCH MESSAGES API...", error);
        toast.error(error.response.data.message);
    }
}
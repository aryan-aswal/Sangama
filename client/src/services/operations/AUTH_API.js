import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { auth_endpoints } from "../apis"
import { setUser, setToken, setLoading } from "../../redux/slices/authSlice"

const {
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API
} = auth_endpoints

export const login = (data, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('POST', LOGIN_API, data);
            console.log("RESPONSE FROM LOGIN API....", response.data);

            if (!response.data.success) {
                console.log("COULD NOT LOGIN", response.data.message);
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            dispatch(setUser(response.data.user));
            dispatch(setToken(response.data.token));
            navigate('/meeting');
        } catch (error) {
            console.log("ERROR OCCURRED AT LOGIN API...", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const signOut = (navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('loading...');
        try {
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.clear();
        } catch (error) {
            console.log("ERROR OCCURRED AT SIGN OUT API...", error);
        }
        navigate('/auth');
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const signup = (data, navigate) => {
    return async (dispatch) => {
        console.log(data)
        dispatch(setLoading(true));
        const toastId = toast.loading('loading...');
        try {
            const response = await apiConnector('POST', SIGNUP_API, data);
            console.log("RESPONSE FROM SIGNUP API....", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            console.log("SIGNUP SUCCESSFULLY...", response.data.message);
            navigate('/auth');
        } catch (error) {
            console.log("ERROR OCCURRED AT SIGNUP API...", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const sendOTP = (data, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('loading...');
        try {
            const response = await apiConnector('POST', SENDOTP_API, { email: data });
            console.log("RESPONSE FROM SEND_OTP API....", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            console.log("OTP SENT SUCCESSFULLY....", response.data.message);
            navigate('/verify-via-otp');
        } catch (error) {
            console.log("ERROR OCCURRED AT SEND OTP API...", error);
            toast.error(error?.response?.data?.message || "Could not send OTP.");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
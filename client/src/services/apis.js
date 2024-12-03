const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
console.log(BASE_URL);
export const auth_endpoints = {
    LOGIN_API: BASE_URL + '/auth/sign-in',
    SIGNUP_API: BASE_URL + '/auth/sign-up',
    SENDOTP_API: BASE_URL + '/auth/send-otp',
}

export const meeting_endpoints = {
    CREATE_TOKEN_API: BASE_URL + '/meeting/create-token',
    FETCH_MEETING_DETAILS_API:  BASE_URL + '/meeting/fetch-meeting-details',
    JOIN_MEETING_API: BASE_URL + '/meeting/join-meeting',
    FETCH_MESSAGES_API: BASE_URL + '/meeting/fetch-messages',
}
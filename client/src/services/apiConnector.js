import axios from 'axios'

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, data = null, headers = null, params = null) => {
    return axiosInstance({
        method,
        url,
        data,
        headers,
        params
    })
}

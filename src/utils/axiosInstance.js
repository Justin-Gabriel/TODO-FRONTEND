import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Accept': 'application/json'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        if (response?.data) {
            return response?.data
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;
import axios from "axios";

export const http = axios.create({
    baseURL: "./",
    headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use((config) => {
    return config;
});

http.interceptors.response.use(
    function (config) {
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

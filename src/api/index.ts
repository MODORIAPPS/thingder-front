import { isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

export const ACCESS_TOKEN_KEY = "@ACCESS_TOKEN";

export const setAccessTokenIfAvailable = async (): Promise<string | null> => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    main.defaults.headers.common['Authorization'] = token ?? "";
    return token;
};

const main = axios.create({
    baseURL: import.meta.env.VITE_API_CLIENT_BASEURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

main.interceptors.response.use((response) => {
    // console.log(response);
    console.log(response);
    return response;
}, async (error) => {
    console.error('intercepter error', JSON.stringify(error));
    console.log('intercepter error data', error?.response?.data)
    if (error?.response?.data?.exception === "org.springframework.security.core.userdetails.UsernameNotFoundException") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        main.defaults.headers.common['Authorization'] = "";
    }

    if (error?.response?.data?.message === "존재하지 않는 멤버입니다.") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        main.defaults.headers.common['Authorization'] = "";
    }

    return Promise.reject(error);
});

export default {
    main
}

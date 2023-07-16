import axiosClient from './axiosClient';
import axios from 'axios';
import userSlice from '../Redux/Slice/userSlice';
import jwtDecode from 'jwt-decode';
function createaAxiosAuth({ accessToken, refreshToken }, dispatch) {
    const axiosAuth = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let token = {};
    axiosAuth.interceptors.request.use(
        async (config) => {
            // console.log('kiem tra xem refreshTOken', refreshToken);
            // Customize config before sending request
            const decode = jwtDecode(accessToken);
            token.accessToken = accessToken;
            if (decode.exp < Date.now() / 1000) {
                // console.log('token', refreshToken);
                token = await axiosClient.post(
                    `${process.env.REACT_APP_API_URL}/user/refreshtoken`,
                    JSON.stringify({ token: refreshToken }),
                );
                dispatch(userSlice.actions.refreshToken(token));
            }
            config.headers.Authorization = 'Bearer ' + token.accessToken;
            return config;
           
        },
        (error) => {
            // console.log(error);
            // Do something with request error
            return Promise.reject(error);
        },
    );
    axiosAuth.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }
            return response;
        },
        (error) => {
            console.log(error.response);
                // Do something with response error
                return Promise.reject(error);
        },
    );
    return axiosAuth;
}

export default createaAxiosAuth;

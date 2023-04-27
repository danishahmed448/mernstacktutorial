import axios from 'axios';
import {dislikeFailure, dislikeStart, dislikeSuccess, likeFailure, likeStart, likeSuccess, loginFailure,loginStart,loginSuccess, logoutSuccess, registerFailure, registerStart, registerSuccess} from './AuthActions';
import { axiosInstance } from '../axiosInstance/axiosInstance';

export const login = async(user,dispatch)=>{
    dispatch(loginStart());
    try {
        const res = await axiosInstance.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}
export const register = async(user,dispatch)=>{
    dispatch(registerStart());
    try {
        const res = await axiosInstance.post("/auth/register",user);
        dispatch(registerSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(registerFailure());
    }
}
export const likeaMovie = async(movieID,dispatch)=>{
    dispatch(likeStart());
    try {
        const res = await axiosInstance.post("/users/favorites",{movieID},{
            headers: {
                token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
            }
        });
        dispatch(likeSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(likeFailure());
    }
}
export const dislikeaMovie = async(movieID,dispatch)=>{
    dispatch(dislikeStart());
    try {
        const res = await axiosInstance.delete(`/users/favorites/${movieID}`,{
            headers: {
                token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
            }
        });
        dispatch(dislikeSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(dislikeFailure());
    }
}
export const logout = async(dispatch)=>{
    dispatch(logoutSuccess());
}

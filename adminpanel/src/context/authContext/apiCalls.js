import axios from 'axios';
import {loginFailure,loginStart,loginSuccess} from './AuthActions';
import { axiosInstance } from '../../axiosInstance/axiosInstance';

export const login = async(user,dispatch)=>{
    dispatch(loginStart());
    try {
        const res = await axiosInstance.post("/auth/login",user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}
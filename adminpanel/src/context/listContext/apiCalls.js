import axios from 'axios';
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from './listActions';
import { axiosInstance } from '../../axiosInstance/axiosInstance';

export const getLists = async(dispatch)=>{
    dispatch(getListsStart());
    try {
        const res = await axiosInstance.get('/lists',{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(getListsSuccess(res.data));
    } catch (error) {
        dispatch(getListsFailure());
    }
}
export const createList = async(list,dispatch)=>{
    dispatch(createListStart());
    try {
        const res = await axiosInstance.post('/lists',list,{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(createListSuccess(res.data));
    } catch (error) {
        dispatch(createListFailure());
    }
}
export const deleteList = async(id,dispatch)=>{
    dispatch(deleteListStart());
    try {
        await axiosInstance.delete(`/lists/${id}`,{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(deleteListSuccess(id));
    } catch (error) {
        dispatch(deleteListFailure());
    }
}
export const updateList = async(list,dispatch)=>{
    dispatch(updateListStart());
    try {
        const res = await axiosInstance.put(`/lists/${list._id}`,list,{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(updateListSuccess(res.data));
    } catch (error) {
        dispatch(updateListFailure());
    }
}
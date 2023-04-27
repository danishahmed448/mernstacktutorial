import axios from 'axios';
import { createMovieStart, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess,createMovieSuccess,createMovieFailure, updateMovieStart, updateMovieSuccess, updateMovieFailure } from './MovieActions';
import { axiosInstance } from '../../axiosInstance/axiosInstance';

export const getMovies = async(dispatch)=>{
    dispatch(getMoviesStart());
    try {
        const res = await axiosInstance.get('/movies',{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(getMoviesSuccess(res.data));
    } catch (error) {
        dispatch(getMoviesFailure());
    }
}
export const createMovie = async(movie,dispatch)=>{
    dispatch(createMovieStart());
    try {
        const res = await axiosInstance.post('/movies',movie,{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(createMovieSuccess(res.data));
    } catch (error) {
        dispatch(createMovieFailure());
    }
}
export const deleteMovie = async(id,dispatch)=>{
    dispatch(deleteMovieStart());
    try {
        await axiosInstance.delete(`/movies/${id}`,{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(deleteMovieSuccess(id));
    } catch (error) {
        dispatch(deleteMovieFailure());
    }
}
export const updateMovie = async(movie,dispatch)=>{
    dispatch(updateMovieStart());
    try {
        const res = await axiosInstance.put(`/movies/${movie._id}`,movie,{
            headers:{
                token:`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(updateMovieSuccess(res.data));
    } catch (error) {
        dispatch(updateMovieFailure());
    }
}
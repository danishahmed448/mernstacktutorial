export const loginStart = ()=>({
    type:'LOGIN_START',
});
export const loginSuccess = (user)=>({
    type:'LOGIN_SUCCESS',
    payload:user,
});
export const loginFailure = ()=>({
    type:'LOGIN_FAILURE',
});
export const registerStart = ()=>({
    type:'REGISTER_START',
});
export const registerSuccess = (user)=>({
    type:'REGISTER_SUCCESS',
    payload:user,
});
export const registerFailure = ()=>({
    type:'REGISTER_FAILURE',
});
export const likeStart = ()=>({
    type:'LIKE_START',
});
export const likeSuccess = (user)=>({
    type:'LIKE_SUCCESS',
    payload:user,
});
export const likeFailure = ()=>({
    type:'LIKE_FAILURE',
});
export const dislikeStart = ()=>({
    type:'DISLIKE_START',
});
export const dislikeSuccess = (user)=>({
    type:'DISLIKE_SUCCESS',
    payload:user,
});
export const dislikeFailure = ()=>({
    type:'DISLIKE_FAILURE',
});

export const logoutSuccess= ()=>({
    type:'LOGOUT',
});
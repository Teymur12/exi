// const postsReducer = (state = { posts: [] }, action) => {
//     switch (action.type) {
//         case 'LIKE_POST':
//             return {
//                 ...state,
//                 posts: state.posts.map(post => 
//                     post._id === action.payload._id ? action.payload : post
//                 ),
//             };
//         case 'UNLIKE_POST':
//             return {
//                 ...state,
//                 posts: state.posts.map(post => 
//                     post._id === action.payload._id ? action.payload : post
//                 ),
//             };
//         default:
//             return state;
//     }
// };

import { createSlice } from "@reduxjs/toolkit";


// export default postsReducer;


const postSlice =  createSlice({
    name:"post",
    initialState:{
        likingPosts:localStorage.getItem("likings") || []
    },
    reducers:{
        likingPost:(action,state)=>{
            state.likingPosts.push(action);
        },
        unlikingPost:(action,state)=>{
            state.likingPosts = state.likingPosts.filter(post=>post._id!==action._id)
        }
    }
})

export const {likingPost,unlikingPost} = postSlice.actions;

export default postSlice.reducer;
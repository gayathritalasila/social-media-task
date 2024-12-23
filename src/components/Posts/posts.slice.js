import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        likePost: (state, action) => {
            const { postId, userId } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                // Check if the user has already liked the post
                if (!post.likedBy.includes(userId)) {
                    post.likes += 1;
                    post.likedBy.push(userId);
                }
            }
        },
        setPostLikes: (state, action) => {
            const { postId, likes, likedBy } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = likes;
                post.likedBy = likedBy;
            }
        },
    },
});

export const { addPost, setPosts, setLoading, likePost, setPostLikes } = postsSlice.actions;
export default postsSlice.reducer;

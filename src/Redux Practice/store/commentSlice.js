import { createSlice, current } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: "comments",
    initialState: {
        commentList: []
    },
    reducers: {
        addNewComment: (state, action) => {
            state.commentList.push(action.payload);
            console.log("New comment added: ", current(state.commentList));
        }
    }
})

export const { addNewComment } = commentSlice.actions;
export default commentSlice.reducer;
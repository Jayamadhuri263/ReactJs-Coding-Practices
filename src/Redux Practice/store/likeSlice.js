import { createSlice } from "@reduxjs/toolkit";

export const LikeSlice = createSlice({
    name: "likes",
    initialState: {
        count: 0
    },
    reducers: {
        countLike: (state) => {
            state.count += 1;
        }
    }
})

export const {countLike} = LikeSlice.actions;
export default LikeSlice.reducer;
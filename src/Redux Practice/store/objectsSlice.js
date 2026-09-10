import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGetLoading: false,
    data:[],
    error: "",
    isPostLoading: false,
    postData: [],
    postError: ""
};

export const fetchObjectList = createAsyncThunk("objects/fetchObjectList", async() => {
    const response = await fetch("https://api.restful-api.dev/objects");
    const data = await response.json()
    return data;
});

export const addNewObject = createAsyncThunk("/objects/addNewObject", async(requestPayload) => {
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestPayload)
    };
    const response = await fetch("https://api.restful-api.dev/objects", options);
    
    // Check if the response is okay (status 200-299)
    if (!response.ok) {
        throw new Error('Failed to create new object');
    }
    const data = response.json();
    return data;
});

const objectsSlice = createSlice({
    name: "objects",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchObjectList.pending, (state) => {
            state.isGetLoading = true;
        }) 
        .addCase(fetchObjectList.fulfilled, (state, action) => {
            state.isGetLoading = false;
            state.data = (action.payload);
        })
        .addCase(fetchObjectList.rejected, (state, action) => {
            state.isGetLoading = false;
            state.error = action.error.message || "Somethig went wrong!"
        })
        .addCase(addNewObject.pending, (state) => {
            state.isPostLoading = true;
        })
        .addCase(addNewObject.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.postData = action.payload;
        })
        .addCase(addNewObject.rejected, (state, action) => {
            state.isPostLoading = false;
            state.postError = action.error.message || "Something went wrong!"
        })
    }
})

export default objectsSlice.reducer;
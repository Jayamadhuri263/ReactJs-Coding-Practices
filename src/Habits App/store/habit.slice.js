import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async() => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // await new Promise((resolve, reject) => setTimeout(reject("No results found"), 2000));
    return [
        {
            id: 1,
            name: "Sing",
            frequency: "Daily",
            completedDates: [],
            createdAt: new Date().toISOString()
        }
    ]
})

const initialState = {
    isLoading: false,
    habits: [],
    error: ""
}

const habitSlice = createSlice({
    name: "habits",
    initialState: initialState,
    reducers: {
        addHabit: (state, action ) => {
            const newHabit = {
                id: uuid(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
            }
            console.log("newHabit: ", newHabit);
            state.habits.push(newHabit);
            console.log("state.habits: ", state.habits);
        },
        toggleHabit: (state, action) => {
            const habit = state.habits.find((eachHabit) => eachHabit.id === action.payload.id);
            if(habit){
                const index = habit.completedDates.indexOf(action.payload.date);
                if(index > -1){
                    habit.completedDates.splice(index, 1)
                }else{
                    habit.completedDates.push(action.payload.date)
                }
            }
        },
        removeHabit: (state, action) => {
            state.habits = state.habits.filter((eachHabit) => eachHabit.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.habits = action.payload;
        })
        .addCase(fetchHabits.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
import React, { useState } from 'react'
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { addHabit } from "./store/habit.slice";

const AddHabitForm = () => {
    const [habitName, setHabitName] = useState("");
    const [habitFrequency, setHabitFrequency] = useState("Daily");

    const dispatch = useDispatch();

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log("habitName: ", habitName, " and habitFrequency: ", habitFrequency);
        dispatch(addHabit({ name: habitName, frequency: habitFrequency }));
        setHabitName("");
        setHabitFrequency("Daily");
    }

    return (
        <form onSubmit={onSubmitForm}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <TextField label="Habit Name" value={habitName} onChange={(e) => setHabitName(e.target.value)} />
                <FormControl>
                    <InputLabel id="habit-frequency-label">Habit Frequency</InputLabel>
                    <Select labelId="habit-frequency-label" id="habit-frequency-select" value={habitFrequency} onChange={(e) => setHabitFrequency(e.target.value)} label="Habit Frequency">
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Add Habit</Button>
            </Box>
        </form>
    )
}

export default AddHabitForm
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Container, Typography } from "@mui/material";
import AddHabitForm from "./add-habit-form";
import HabitList from "./habit-list";
import HabitStats from "./habit-stats";

function HabitsApp() {
    return (
        <Provider store={store}>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography component="h4" variant="h4" align="center">Habits Tracker</Typography>
                <AddHabitForm />
                <HabitList />
                <HabitStats/>
            </Container>
        </Provider>
    )
}

export default HabitsApp;
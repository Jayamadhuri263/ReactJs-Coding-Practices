import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "./store/habit.slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats = () => {
    const { habits, isLoading, error } = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHabits());
    }, [dispatch]);

    if(isLoading){
        return <LinearProgress />
    }

    if(error){
        return <Typography color="error">{error}</Typography>
    }

    const getCompletedToday = () => {
        const today = new Date().toISOString().split("T")[0];
        return habits?.filter(eachHabit => eachHabit.completedDates.includes(today)).length;
    }

    const getStreak = habit => {
        let streak = 0;
        const currentDate = new Date();
    
        while(true){
          const dateString = currentDate.toISOString().split("T")[0];
          if(habit.completedDates.includes(dateString)){
            streak ++;
            currentDate.setDate(currentDate.getDate() - 1);
          }else{
            break
          }
        }
        return streak;
    }

    const getLongestStreak = () => {
        return Math.max(...habits?.map(getStreak) ?? [], 0)
    }

    return (
        <Paper elevation={4} sx={{p:2, mt:4}}>
            <Typography variant="h6" gutterBottom>Habit Statistics</Typography>
            <Typography variant="body1">Total Habits: {habits?.length}</Typography>
            <Typography variant="body1">Completed Today: {getCompletedToday()}</Typography>
            <Typography variant="body1">Longest Streak: {getLongestStreak()}</Typography>
        </Paper>
    )
}
export default HabitStats;
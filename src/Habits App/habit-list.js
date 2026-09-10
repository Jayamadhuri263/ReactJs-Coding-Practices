import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper, Grid, Button, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MdDelete } from "react-icons/md";
import { toggleHabit, removeHabit } from "./store/habit.slice";

const HabitList = () => {
  const dispatch = useDispatch();
  const habitsList = useSelector((state) => state.habits?.habits);
  console.log("habits in habit-list: ", habitsList);

  const today = new Date().toISOString().split("T")[0];

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


  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habitsList.length > 0 && <Typography component="h5" variant="h5" align="center">
        Habit List
      </Typography>}
      {habitsList?.map((habit) => (
        <Paper key={habit.id} elevation={4} sx={{ p: 2 }}>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
          >
            <Grid xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit?.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircleIcon />}
                    onClick={() => dispatch(toggleHabit({id: habit.id, date: today}))}
                  >
                    {habit?.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                </Box>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<MdDelete />}
                    onClick={() => dispatch(removeHabit({id: habit.id}))}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{mt: 2}}>
            <Typography>Current Streak: {getStreak(habit)} days</Typography>
            <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100} sx={{mt: 1}} />
          </Box>
        </Paper>  
      ))}
    </Box>
  );
};

export default HabitList;

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchObjectList } from './store/objectsSlice'

const DisplayObjectsList = () => {
    const dispatch = useDispatch();

    const objectsList = useSelector(state => state.objects.data);
    const status = useSelector(state => state.objects.isGetLoading);
    const errorMessage = useSelector(state => state.objects.error);

    useEffect(() => {
        dispatch(fetchObjectList())
    }, [dispatch])

    if(status){
        return <LinearProgress />
    }
    
    if(errorMessage){
        return <Typography variant="body1" color="error" sx={{ mb: 1.5, ml:3, pt:1, fontWeight: 700 }}>{errorMessage}</Typography>
    }

    return objectsList.length === 0 ? (
        <Typography variant="body2" sx={{ ml: 3 }}>No data found</Typography>
    ) : (
        <Box sx={{ px: 3, pb: 3 }}>
            <Grid container spacing={1.5}>
            {objectsList.map(object => (
                <Grid item xs={12} sm={6} md={4} key={object.id}>
                    <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
                        <CardContent sx={{ pb: "16px !important" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {object.name || "Unknown Model"}
                            </Typography>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                {object.data?.color && <Chip
                                    label={`Color: ${object.data?.color || "N/A"}`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />}
                                {(object.data?.["capacity GB"] || object.data?.Capacity) && <Chip
                                    label={`Capacity: ${object.data?.["capacity GB"] || object.data?.Capacity || "N/A"}`}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                />}
                                {object.data?.price && <Chip
                                    label={`Price: ${object.data?.price || "N/A"}`}
                                    size="small"
                                    color="warning"
                                    variant="outlined"
                                />}
                                {object.data?.generation && <Chip
                                    label={`Generation: ${object.data?.generation || "N/A"}`}
                                    size="small"
                                    color="info"
                                    variant="outlined"
                                />}
                                { object.data?.year && <Chip
                                    label={`Year: ${object.data?.year || "N/A"}`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />}
                                {object.data?.['CPU model'] && <Chip
                                    label={`CPU model: ${object.data?.['CPU model'] || "N/A"}`}
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                />}
                                {object.data?.['Hard disk size'] && <Chip
                                    label={`Hard disk size: ${object.data?.['Hard disk size'] || "N/A"}`}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                />}
                                {object.data?.['Strap Colour'] && <Chip
                                    label={`Strap Colour: ${object.data?.['Strap Colour'] || "N/A"}`}
                                    size="small"
                                    color="info"
                                    variant="outlined"
                                />}
                                {object.data?.['Case Size'] && <Chip
                                    label={`Case Size: ${object.data?.['Case Size'] || "N/A"}`}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                />}
                                {object.data?.['Description'] && <Chip
                                    label={`Description: ${object.data?.['Description'] || "N/A"}`}
                                    size="small"
                                    color="warning"
                                    variant="outlined"
                                />}
                                {object.data?.['Screen size'] && <Chip
                                    label={`Screen size: ${object.data?.['Screen size'] || "N/A"}`}
                                    size="small"
                                    color="info"
                                    variant="outlined"
                                /> }                              
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </Box>
    )
}

export default DisplayObjectsList;
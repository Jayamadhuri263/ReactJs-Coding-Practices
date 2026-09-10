import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addNewObject } from "./store/objectsSlice";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

const PostNewObject = () => {
    const dispatch = useDispatch();
    const postData = useSelector(state => state.objects.postData);
    const postError = useSelector(state => state.objects.postError);
    const isPostLoading = useSelector(state => state.objects.isPostLoading);


    const requestPayload = {
        "name": "Apple MacBook 26",
        "data": {
          "year": 2026,
          "price": 20000.99,
          "CPU model": "Intel Core i90",
          "Hard disk size": "100 TB"
        }
    };

    const clickHandler = async() => {
        await dispatch(addNewObject(requestPayload));
    }

    if(postError){
        return <Typography variant="body1" color="error" sx={{ mb: 1.5, ml:3, pt:1, fontWeight: 700 }}>{postError}</Typography>
    }

    if(isPostLoading){
        return <LinearProgress />
    }

    return (
        <>
            {postData.createdAt && <Typography variant="body1" color="success" sx={{mt:5, ml:3, pt:1, fontWeight: 700}}>Data is posted successfully!</Typography>}
            {!postData.createdAt && <Typography variant="body1" color="info" sx={{mt:5, ml:3, pt:1, fontWeight: 700}}>Click Post here to add an object</Typography>}
            <Button variant="contained" onClick={clickHandler} sx={{ mb: 1.5, mt:2, ml:3, pt:1, fontWeight: 700 }}>Post</Button>
        </>
    )
}

export default PostNewObject;
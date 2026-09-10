import { configureStore } from '@reduxjs/toolkit';
import SubscriberReducer from "./subscriberSlice";
import CommentReducer from './commentSlice'
import LikeReducer from './likeSlice';
import objectsReducer from './objectsSlice'

export default configureStore({
  reducer: {
    subscribers: SubscriberReducer,
    comments: CommentReducer,
    likes: LikeReducer,
    objects: objectsReducer
  },
})
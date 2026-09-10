import { createSlice, current } from '@reduxjs/toolkit'

export const SubscriberSlice = createSlice({
    name: "subscribers",
    initialState: {
        subscriberList: []
    },
    reducers: {
        addNewSubscriber: (state, action) => {
            state.subscriberList.push(action.payload);
            console.log("New subscriber added:", current(state.subscriberList));
        }
    }
})

export const {addNewSubscriber} = SubscriberSlice.actions;
export default SubscriberSlice.reducer;
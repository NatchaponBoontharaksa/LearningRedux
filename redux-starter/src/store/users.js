import { createSlice } from "@reduxjs/toolkit"
import reducer from "./reducer";

let lastId = 0;

const slice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        userAdded: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name
            })
        }
    }
})


export const { userAdded } = slice.actions;
export default slice.reducer;
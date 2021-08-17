import { createSlice } from "@reduxjs/toolkit";
import {createSelector, reselect} from 'reselect';

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        },

        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },

        bugRemoved: (bugs, action) => {
            return bugs.list.filter((bug) => bug.id !== action.payload.id )
        },

        bugAssignedToUser: (bugs, action) => {
            const {bugId, userId} = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        }
    }
})

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;

export default slice.reducer;


// selector function
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)

// // Action creator
// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved")

// // reducer
// let lastId = 0;

// export default createReducer([], {
//     [bugAdded.type]: (bugs, action) => {
//         bugs.push({
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false
//         });
//     },

//     [bugResolved.type]: (bugs, action) => {
//         const index = bugs.findIndex(bug => bug.id === action.payload.id);
//         bugs[index].resolved = true;
//     },

// })
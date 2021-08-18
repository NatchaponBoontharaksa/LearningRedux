import { createSlice } from "@reduxjs/toolkit";
import { createSelector, reselect } from 'reselect';
import { apiCallBegan } from './api'
import moment from 'moment'

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {

        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },

        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },

        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },

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
            return bugs.list.filter((bug) => bug.id !== action.payload.id)
        },

        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        }
    }
})

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;

export default slice.reducer;

// Action Creator
const url = "bugs";
export const loadBugs = () => (dispatch, getState) => {

    const {lastFetch} = getState().entities.bugs;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;

    dispatch(
        apiCallBegan({
            url: url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type
        })
    );
}


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
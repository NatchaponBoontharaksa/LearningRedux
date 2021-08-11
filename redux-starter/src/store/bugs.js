import { createAction } from "@reduxjs/toolkit";

// Action type
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved"
// const BUG_RESOLVED = "bugResolved"

// Action creator

export const bugAdded = createAction("bugAdded");
// export const bugAdded = description => (
//     {
//         type: BUG_ADDED,
//         payload: { description: description }
// });


export const bugResolved = createAction("bugResolved");
// export const bugResolved = id => (
//     {
//         type: BUG_RESOLVED,
//         payload: { id: id } // => payload: { id }  cause id = id can duplicate
//     }
// );

export const bugRemoved = createAction("bugRemoved")

let lastId = 0;

export default function reducer(state = [], action) {

    switch (action.type) {
        case bugAdded.type:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

        case bugRemoved.type:
            return state.filter(bug => bug.id !== action.payload.id);

        case bugResolved.type:
            return state.map(bug =>
                bug.id !== action.payload.id ? bug : { ...bug, resolved: true });

        default:
            return state;
    }

}
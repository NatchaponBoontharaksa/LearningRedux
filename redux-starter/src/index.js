import configureStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser, loadBugs } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

store.dispatch(loadBugs());

// store.dispatch({
//     type: 'apiCallBegan',
//     payload: {
//         url: "/bugs",
//         onSuccess: "bugsReceived",
//         onError: "apiRequestFailed"
//     }
// });

// store.dispatch((dispatch, getState) => {
//     dispatch({
//         type: "error",
//         payload: {message: "An error occured."}
//     })
    
//     // dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//     // console.log(getState())
// });

// const unsubscribe = store.subscribe(() => {
//     console.log("Store change: " + store.getState())
// });

// store.dispatch(userAdded({name: "user 1"}));
// store.dispatch(userAdded({name: "user 2"}));
// store.dispatch(bugAdded({ description: "bug 123"}));
// store.dispatch(bugAdded({ description: "bug 555"}));
// store.dispatch(bugAssignedToUser({bugId: 1, userId: 1}));
// store.dispatch(projectAdded({ name: "project 1" }));
// store.dispatch(bugResolved({id: 2}))

// const unResolvedBugs = getUnresolvedBugs(store.getState());

// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs)
// console.log(unResolvedBugs);

// console.log(store.getState().entities);

// unsubscribe();

// store.dispatch(bugResolved({id: 1}));
// store.dispatch(bugRemoved({id: 2}));

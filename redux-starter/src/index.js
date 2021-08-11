import store from './store/store';
import { bugAdded, bugResolved } from './store/actions';

const unsubscribe = store.subscribe(() => {
    console.log("Store change: " + store.getState())
});

store.dispatch(bugAdded("bug 2"));

console.log(store.getState());

unsubscribe();

store.dispatch(bugResolved(1));

console.log(store.getState());


// store.dispatch({
//     type: actions.bugRemoved,
//     payload: {
//         id: 1
//     }
// })


import configureStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';
import { projectAdded } from './store/projects';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store change: " + store.getState())
});

store.dispatch(bugAdded({ description: "bug 123"}));
store.dispatch(bugAdded({ description: "bug 555"}));
store.dispatch(projectAdded({ name: "project 1" }))


console.log(store.getState());

unsubscribe();

// store.dispatch(bugResolved({id: 1}));
// store.dispatch(bugRemoved({id: 2}));

console.log(store.getState());


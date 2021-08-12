import configureStore from './store/configureStore';
import { bugAdded, bugResolved } from './store/bugs';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store change: " + store.getState())
});

store.dispatch(bugAdded({ description: "bug 123"}));

console.log(store.getState());

unsubscribe();

store.dispatch(bugResolved({id: 1}));

console.log(store.getState());


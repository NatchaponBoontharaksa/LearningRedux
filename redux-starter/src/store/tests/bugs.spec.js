import { addBug, resolveBug } from '../bugs';
import { apiCallBegan } from '../api';
import configureStore from '../configureStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

// describe("bugsSlice", () => {
//     describe("action creator", () => {
//         it("addBug", () => {
//             const bug = { description: 'a' };
//             const result = addBug(bug);
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             };
//             expect(result).toEqual(expected);
//         })
//     })
// });

describe("bugsSlice", () => {
    let fakeAxios;
    let store;
    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore(); 
    });

    const bugsSlice = () => store.getState().entities.bugs;
    
    it("should add the bug to the store if it's saved to the server", async () => {
        // Arrange 
        const bug = { description: "a" };
        // const store = configureStore();

        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost("/bugs").reply(200, savedBug);

        // Act
        await store.dispatch(addBug(bug));

        // Assert
        expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if it's not saved to the server", async () => {
        // Arrange 
        const bug = { description: "a" };
        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost("/bugs").reply(500);

        // Act
        await store.dispatch(addBug(bug));

        // Assert
        expect(bugsSlice().list).toHaveLength(0);
    });

    it("should change resolve status from false to true", async () => {
        // Arrange 
        fakeAxios.onPatch("/bugs/1").reply(200, {id: 1, resolved: true});
        fakeAxios.onPost("/bugs").reply(200, {id: 1});

        // Act
        await store.dispatch(addBug({}))
        await store.dispatch(resolveBug(1));
        // console.log(bugsSlice().list);
        // Assert
        expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it("should not change resolve status from false to true", async () => {
        // Arrange 
        fakeAxios.onPatch("/bugs/1").reply(500);
        fakeAxios.onPost("/bugs").reply(200, {id: 1});

        // Act
        await store.dispatch(addBug({}))
        await store.dispatch(resolveBug(1));
        // console.log(bugsSlice().list);
        // Assert
        expect(bugsSlice().list[0].resolved).not.toBe(true);
    });
});
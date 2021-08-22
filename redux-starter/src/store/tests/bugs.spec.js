import { addBug, bugAdded } from '../bugs';
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

        console.log("RETURN: ", bugsSlice().list);

        // Assert
        expect(bugsSlice().list).toContainEqual(savedBug);
    });

    // it("should not add the bug to the store if it's not saved to the server", async () => {
    //     // Arrange 
    //     const bug = { description: "a" };
    //     const savedBug = { ...bug, id: 1 };
    //     fakeAxios.onPost("./bugs").reply(500, savedBug);

    //     // Act
    //     await store.dispatch(addBug(bug));

    //     // Assert
    //     expect(bugsSlice().list).toHaveLength(0);
    // });
});
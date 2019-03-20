jest.mock('../MockService', () => {
    return {
        MockService: jest.fn().mockImplementation(() => {
            return {
                Increment: async() => {
                    return 5;
                },
                getProfileInformation: async() => {
                }
            }
        })
    }

});

import {runSaga} from "@redux-saga/core";
import {incrementAsync, incrementByThree} from "./counterSagas";

describe('Saga Test', () => {

    it("should increment", async () => {
        expect(true).toBe(true);
        const dispatched: any[] = [];

        await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({ count: 0 }),
        }, incrementAsync).toPromise();

        expect(dispatched[0].type).toBe('INCREMENT');
    });

    it("should increment by three", async () => {
        expect(true).toBe(true);
        const dispatched: any[] = [];

        await runSaga({
            dispatch: (action) => dispatched.push(action),
            getState: () => ({ count: 0 }),
        }, incrementByThree, {orig: 1}).toPromise();

        console.log(dispatched);
        expect(dispatched[0].type).toBe('SET_COUNT');
        expect(dispatched[0].newCount).toBe(5);
        expect(dispatched[1].type).toBe('SET_PROFILE');
    });
});


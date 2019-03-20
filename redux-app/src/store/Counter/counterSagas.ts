import {put, takeEvery, call, all, select, takeLatest, fork, join} from 'redux-saga/effects';
import {COUNTER_ACTIONS, setCount, setProfile} from "./counterActions";
import {func} from "prop-types";
import {MockService} from "../MockService";
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

//@ts-ignore
export function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put({type: COUNTER_ACTIONS.INCREMENT});
}

export function* logger(action: any) {
    const state = yield select();
    //LOGS EVERY ACTION MADE TO THE STORE
    console.log(action);
    console.log('State after action', state)
}

export function* incrementByThree(action: any) {
    const mockService = new MockService();
    let originalCount = action.orig;

    const [profile, newCount] = yield all([
        yield call(mockService.getProfileInformation),
        yield call(mockService.Increment, originalCount, 3)
    ]);

    yield put(setCount(newCount));
    yield put(setProfile(profile));
}

export function* incrementByFiveFork(action: any) {
    const mockService = new MockService();
    let originalCount = action.orig;

    const task = yield fork(mockService.getProfileInformation);

    const newCount = yield call(mockService.Increment, originalCount, 5);
    yield put(setCount(newCount));

    const profile = yield join(task);
    yield put(setProfile(profile))
}


//Watcher
export function* watchIncrementAsync() {
    yield takeEvery(COUNTER_ACTIONS.INCREMENT_ASYNC, incrementAsync);
    yield takeLatest(COUNTER_ACTIONS.INCREMENT_ASYNC_THROTTLE, incrementAsync);
    yield takeLatest(COUNTER_ACTIONS.INCREMENT_BY_THREE, incrementByThree);
    yield takeLatest(COUNTER_ACTIONS.INCREMENT_BY_FIVE, incrementByFiveFork);
    yield takeEvery('*', logger);
}

export default function counterSagas() {
    return [
        helloSaga(),
        watchIncrementAsync()
    ];
}

export enum COUNTER_ACTIONS {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
    INCREMENT_ASYNC = "INCREMENT_ASYNC",
    INCREMENT_ASYNC_THROTTLE= "INCREMENT_ASYNC_THROTTLE",
    INCREMENT_BY_THREE = "INCREMENT_BY_THREE",
    INCREMENT_BY_FIVE = "INCREMENT_BY_FIVE",
    SET_COUNT = "SET_COUNT",
    SET_PROFILE = "SET_PROFILE"
}


export function incrementCounter() {
    return {type: COUNTER_ACTIONS.INCREMENT}
}

export function decrementCounter() {
    return {type: COUNTER_ACTIONS.DECREMENT}
}

export function incrementAsync() {
    return {type: COUNTER_ACTIONS.INCREMENT_ASYNC}
}

export function incrementAsyncThrottle() {
    return {type: COUNTER_ACTIONS.INCREMENT_ASYNC_THROTTLE}
}

export function incrementByThree(orig: number) {
    return {type: COUNTER_ACTIONS.INCREMENT_BY_THREE, orig}
}

export function incrementByFive(orig: number) {
    return {type: COUNTER_ACTIONS.INCREMENT_BY_FIVE, orig}
}

export function incrementAsyncThunk() {
    return (dispatch: any) => {
        setTimeout(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(incrementCounter());
        }, 1000);
    };
}

export function setCount(newCount: number) {
    return {type: COUNTER_ACTIONS.SET_COUNT, newCount}
}

export function setProfile(profile: any) {
    return {type: COUNTER_ACTIONS.SET_PROFILE, profile}
}

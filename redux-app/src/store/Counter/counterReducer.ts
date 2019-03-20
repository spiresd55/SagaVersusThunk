import {COUNTER_ACTIONS} from './counterActions';

interface CounterState {
    count: number,
    profile: any;
}

const defaultState: CounterState = {
    count: 0,
    profile: undefined
};

const reducer = function(state=defaultState, action: any) {
    let newState = {...state};

    switch(action.type) {
        case COUNTER_ACTIONS.INCREMENT:
            newState.count++;
            break;
        case COUNTER_ACTIONS.DECREMENT:
            newState.count--;
            break;
        case COUNTER_ACTIONS.SET_COUNT:
            newState.count = action.newCount;
            break;
        case COUNTER_ACTIONS.SET_PROFILE:
            newState.profile = action.profile;
            break;
        default:
            return state;
    }
    return newState;
};

export default reducer;

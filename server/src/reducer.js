import {setEntries, next, vote, INITIAL_STATE} from '../src/core';

export default function reducer(state = INITIAL_STATE, action) {
    // Figure out which function to call, and call it.
    // Honestly it still seems odd we're using switch statements in 2015.
    // The Alt library takes that out using decorators which is a good alternative to redux??
    switch(action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
}
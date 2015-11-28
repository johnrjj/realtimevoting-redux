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
            // here the reducer only knows about the vote part, rather than the entire state...
            return state.update('vote', voteState => vote(voteState, action.entry));
    }
    return state;
}

// Reducer composition:
//    The main reducer function only hands parts of the state to lower-level reducer functions.
//    We separate the job of finding the right location in the state tree
//    from applying the update to that location.
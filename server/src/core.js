import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

function getWinners(vote) {
    if(!vote) return [];
    const [a, b] = vote.get('pair');
    const aVoteCount = vote.getIn(['tally', a], 0);
    const bVoteCount = vote.getIn(['tally', b], 0);

    if (aVoteCount > bVoteCount)      return [a];
    else if (aVoteCount < bVoteCount) return [b];
    else                              return [a, b];
};

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
};

export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    // most always better to morph previous state than create new state
    if(entries.size === 1) {
        return state.remove('vote')
                    .remove('entries')
                    .set('winner', entries.first());
    }

    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
};

export function vote(state, entry) {
    //updateIn(path, init val, fn) is AWESOME!!
    //Reach into the nested data structure path ['vote', 'tally', 'The Matrix'], and apply this function there.
    //If there are keys missing along the path, create new Maps in their place. "
    //If the value at the end is missing, initialize it with 0.
    return state.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
};
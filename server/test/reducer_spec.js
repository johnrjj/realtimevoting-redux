import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {

        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['The Matrix']};
        const nextState = reducer(initialState, action);

        // fromJS via immutable
        expect(nextState).to.equal(fromJS({
            entries: ['The Matrix']
        }));
        // which is equivalent to:
        expect(nextState).to.equal(Map({
            entries: List.of('The Matrix')
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['The Matrix', 'Hackers']
        })
        const action = {type: 'NEXT'}
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Matrix', 'Hackers']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['The Matrix', 'Hackers'],
                tally: {
                    'The Matrix': 2,
                    'Hackers': 5
                }
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'The Matrix'}
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Matrix', 'Hackers'],
                tally: {
                    'The Matrix': 3,
                    'Hackers': 5
                }
            },
            entries: []
        }));
    });

    //An important additional requirement of reducers is that if they are called with an undefined state,
    // they know how to initialize it to a meaningful value. In our case, the initial value is a Map.
    // So, giving an undefined state should work as if an empty Map had been given:
    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['The Matrix']}
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['The Matrix']
        }));
    });

    it('can support reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['The Matrix', 'Hackers']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'The Matrix'},
            {type: 'VOTE', entry: 'Hackers'},
            {type: 'VOTE', entry: 'The Matrix'},
            {type: 'NEXT'}
        ];

        const finalState = actions.reduce(reducer, Map())

        // remember, reduce goes (fromPrevious, current)
        // so first iteration = reducer(Map(), 1st action);
        //    second iteration= reducer(returnedStateFromFirstIteration, 2ndaction)

        expect(finalState).to.equal(fromJS({
            winner: 'The Matrix'
        }));
    })
});
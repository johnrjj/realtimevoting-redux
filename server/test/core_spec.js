import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {
        it('adds entries to the state', () => {
            const state = Map();
            const entries = List.of('The Matrix', 'Hackers');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('The Matrix', 'Hackers')
            }));
        });
        it('converts to immutable', () => {
            const state = Map();
            const entries = ['The Matrix', 'Hackers'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('The Matrix', 'Hackers')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries and puts them into a voting list', () => {
            const state = Map({
                entries: List.of('The Matrix', 'Hackers', 'Hunger Games')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                entries: List.of('Hunger Games'),
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers')
                })
            }));
        });
        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers'),
                    tally: Map({
                        'The Matrix': 1,
                        'Hackers': 3
                    })
                }),
                entries: List.of('Hunger Games', 'Star Wars')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Hunger Games', 'Star Wars')
                }),
                entries: List.of('Hackers')
            }));
        });
        it('puts tied entries of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers'),
                    tally: Map({
                        'The Matrix': 3,
                        'Hackers': 3
                    })
                }),
                entries: List.of('Hunger Games', 'Star Wars')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Hunger Games', 'Star Wars')
                }),
                entries: List.of('The Matrix', 'Hackers')
            }));
        });
        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers'),
                    tally: Map({
                        'The Matrix': 4,
                        'Hackers': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'The Matrix'
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the vote entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers')
                }),
                entries: List()
            });
            const nextState = vote(state, 'The Matrix');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers'),
                    tally: Map({
                        'The Matrix': 1,
                    })
                }),
                entries: List()
            }))
        });
        it('updates an existing tally for the vote entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers'),
                    tally: Map({
                        'The Matrix': 1,
                        'Hackers': 3
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'The Matrix');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('The Matrix', 'Hackers'),
                    tally: Map({
                        'The Matrix': 2,
                        'Hackers': 3
                    })
                }),
                entries: List()
            }))
        });
    });
});
/**
 * Created by johnjohnson on 11/25/15.
 */
import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutabilitySuite', () => {

    describe('an immutable number', () => {
        function incrementState(currentState) {
            return currentState + 1;
        }
        // IN THE WORDS OF KENT BECK, 'THIS IS A LEARNING TEST'
        it('is immutable', () => {
            let state = 42;
            let nextState = incrementState(state);
            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('an immutable list', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }
        it('is immutable', () => {
            let state = List.of('The Matrix', 'Hackers');
            let nextState = addMovie(state, 'Hunger Games');

            expect(nextState).to.equal(List.of(
               'The Matrix', 'Hackers', 'Hunger Games'
            ));

            expect(state).to.equal(List.of(
               'The Matrix', 'Hackers'
            ));
        });
    });

    describe('an immutable tree', () => {
        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
            //return currentState.set('movies', currentState.get('movies').push(movie));
        }
        it('is immutable', () => {
            let state = Map({
                movies: List.of('The Matrix', 'Hackers')
            });
            let nextState = addMovie(state, 'Hunger Games');
            expect(nextState).to.equal(Map({
                movies: List.of('The Matrix', 'Hackers', 'Hunger Games')
            }));
            expect(state).to.equal(Map({
                movies: List.of('The Matrix', 'Hackers')
            }));
        });
    });
});

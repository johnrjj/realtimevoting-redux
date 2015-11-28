import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
    it('is a redux store w/ the right reducer', () => {

        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['The Matrix', 'Hackers']
        });

        expect(store.getState()).to.equal(fromJS({
            entries: ['The Matrix', 'Hackers']
        }));
    });
})
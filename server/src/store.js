import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
    return createStore(reducer);
}


//Question: How many variables do you need in a Redux application?
//    Answer: One. The one inside the store.

// AWESOME.
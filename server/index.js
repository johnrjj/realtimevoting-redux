import makeStore from './src/store';
import startServer from './src/store';

console.log('Creating store, and launching server');

export const store = makeStore();
startServer(store);

console.log('Server running on port 8090');

store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json'),
});

store.dispatch({
    type: 'NEXT',
});
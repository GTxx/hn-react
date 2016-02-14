import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import {browserHistory} from 'react-router';
import {syncHistory, routeReducer} from 'react-router-redux';
import rootReducer from '../reducers/index.js';

const reducer = combineReducers({
  ...rootReducer,
  routing: routeReducer
});

console.log(reducer)

export const reduxRouterMiddleware = syncHistory(browserHistory);

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  reduxRouterMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState={
  story: {},
  fetchState: {isFetching: true, httpReqNum: 0, lastFetchTime: '1999-01-01'},
  categoryStory: {
    topnews: [],
    jobs: [],
    asks: [],
    show: [],
    newstories: []
  },
  currentPage: 1,
  storyComment: {}
}){
  //const store = createStoreWithMiddleware(rootReducer, initialState);
  const store = createStoreWithMiddleware(reducer, initialState);
  return store;
}



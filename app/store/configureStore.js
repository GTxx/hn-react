import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistory} from 'redux-simple-router';

import rootReducer from '../reducers/index.js';

export const history = createBrowserHistory();

export const reduxRouterMiddleware = syncHistory(history);

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
}) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}



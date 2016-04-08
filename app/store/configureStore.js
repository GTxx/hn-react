import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers/index.js';


const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
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
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}

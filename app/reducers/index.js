import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {REQUEST_STORY, RECEIVE_STORY_LIST_AND_STORY,
  REQUEST_HTTP_START, REQUEST_HTTP_SUCCESS,
  FETCH_TOPNEWS, FETCH_JOBS, FETCH_SHOWS,
  RECEIVE_STORY_LIST, RECEIVE_STORY_ID_LIST,
  RECEIVE_STORY_COMMENTS,
  SWITCH_PAGE} from './../actions/actions.js';
import * as actions from '../actions/actions';

export function fetchState(state={isFetching: false, httpReqNum: 0}, action){
  let {httpReqNum, } = state;
  switch (action.type){
    case REQUEST_HTTP_START:
      httpReqNum = httpReqNum + 1;
      return Object.assign({}, state, {
        isFetching: true,
        httpReqNum});
    case REQUEST_HTTP_SUCCESS:
      httpReqNum = httpReqNum - 1;
      return Object.assign({}, state, {
        isFetching: false,
        httpReqNum,
        lastFetchTime: action.receiveAt});
    default:
      return state
  }
}

export function story(state = {}, action) {
  switch (action.type) {
    case RECEIVE_STORY_LIST:
      let newItems = {}
      for(let story of action.storyList){
        newItems[story.id] = story
      }
      return Object.assign({}, state, newItems);
    default:
      return state;
  }
}


export function categoryStory(state={}, action){
  switch (action.type){
    case RECEIVE_STORY_ID_LIST:
      return Object.assign({}, state, {[action.category]: action.storyIdList})
    default:
      return state
  }
}

export function currentPage(state=1, action){
  switch (action.type){
    case SWITCH_PAGE:
      return action.pageNum;
    default:
      return state
  }
}

export function storyComment(state={}, action){
  switch(action.type){
    case RECEIVE_STORY_COMMENTS:
      return Object.assign({}, state, {[action.data.id]: action.data})
    default:
      return state
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVE_USER:
      return Object.assign({}, state, { [action.data.id]: action.data });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  story,
  fetchState,
  categoryStory,
  currentPage,
  storyComment,
  user,
  routing: routerReducer,
});

export default rootReducer;

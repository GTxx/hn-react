import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import {REQUEST_STORY, RECEIVE_STORY_LIST_AND_STORY,
  REQUEST_HTTP_START, REQUEST_HTTP_SUCCESS,
  FETCH_TOPNEWS, FETCH_JOBS, FETCH_SHOWS,
  RECEIVE_STORY_LIST, RECEIVE_STORY_ID_LIST,
  RECEIVE_STORY_COMMENTS,
  SWITCH_PAGE} from './../actions/actions.js';


const CategoryUrl = {
  topnews: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  jobs: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
  asks: 'https://hacker-news.firebaseio.com/v0/askstories.json',
  newstories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
  show: 'https://hacker-news.firebaseio.com/v0/showstories.json'
};

export function fetchState(state={isFetching: false, }, action){
  switch (action.type){
    case REQUEST_HTTP_START:
      return Object.assign({}, state, {isFetching: true});
    case REQUEST_HTTP_SUCCESS:
      return Object.assign({}, state, {isFetching: false, lastFetchTime: action.receiveAt});
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

const rootReducer = combineReducers({
  story: story,
  fetchState: fetchState,
  categoryStory: categoryStory,
  currentPage: currentPage,
  routing: routeReducer,
  storyComment: storyComment
});

export default rootReducer;

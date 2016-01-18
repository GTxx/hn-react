import {combineReducers} from 'redux';
import {REQUEST_STORY, RECEIVE_STORY_LIST_AND_STORY} from './actions.js';


const CategoryUrl = {
  topnews: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  jobs: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
  asks: 'https://hacker-news.firebaseio.com/v0/askstories.json',
  newstories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
  show: 'https://hacker-news.firebaseio.com/v0/showstories.json'
};

// state example
const state = {
  selectCategory: 'topnews', // jobs, asks, newstory, show
  topnews: {
    isFetching: false,
    storyList: [],
    item: {}
  }
}

function selectedCategory(state = 'topnews', action) {
  // 切换频道
  return action.category;
}



export function story(state = {isFetching: false, storyList: [], item: []}, action) {
  switch (action.type) {
    case REQUEST_STORY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_STORY_LIST_AND_STORY:
      return Object.assign({}, state, {
        isFetching: false,
        storyList: action.storyList,
        stories: action.stories
      })
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  story
});
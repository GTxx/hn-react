import {combineReducers} from 'redux';

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
  story: {
    topnews: {
      isFetching: false,
      storyList: [],
      item: {}
    },
    jobs :{
      isFetching: false,
      storyList: [],
      item: {}
    }
  }

}

function selectedCategory(state = 'topnews', action) {
  // 切换频道
  return action.category;
}

function storyList(state = {isFetching: false, items: []}, action) {
  switch (action.type) {
    case
  }
}

function story(state={isFetching: false, storyList: [], item: {}}, action){
  switch(action.type){

  }
}

function story(state={}, action){
  switch(action.type){
    case 'topnews':
    case 'jobs':
      return Object.assign({}, state, {
        [action.category]: story(state[action.category], action)
      })
    default:
      return state
  }
}
const rootReducer = combineReducers()
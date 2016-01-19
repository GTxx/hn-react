import async from 'async';
import {get_data, Paginate} from './utils.js';


export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const REQUEST_STORY = 'REQUEST_STORY';
export const RECEIVE_STORY = 'RECEIVE_STORY';
export const REQUEST_HTTP_START = 'REQUEST_HTTP_START';
export const REQUEST_HTTP_SUCCESS = 'REQUEST_HTTP_SUCCESS';

export const RECEIVE_STORY_LIST_AND_STORY = 'RECEIVE_STORY_LIST_AND_STORY';
export const RECEIVE_STORY_ID_LIST = 'RECEIVE_STORY_ID_LIST';


function requestStory(requestType) {
  return {type: 'isFetching', requestType}
}

function receiveStories(storyIDList, storyList) {
  return {
    type: 'RECEIVE_STORIES',
    storyIDList,
    storyList: storyList,
    receiveAt: Date.now()
  }
}

function receiveStoryList(storyList, category) {
  return {
    type: 'RECEIVE_STORY_LIST',
    storyList,
    category,
    receiveAt: Date.now()
  }
}

// thunk action
export function fetchStories(storyIdList) {
  //获取多个story
  return (dispatch) => {
    //开始获取story list
    dispatch(startHTTPRequest('storyIdList'));

    async.map(storyIdList, (storyId, cb)=> {
      get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
        return cb(null, res);
      })
    }, (err, result)=> {
      dispatch(receiveStories(storyIdList, result))
    })
  }
}

export function receiveStoryListAndStory(storyList, result) {
  return {
    type: RECEIVE_STORY_LIST_AND_STORY,
    storyList,
    stories: result
  }
}

export function receiveStoryIdList(storyIdList, category){
  return {
    type: RECEIVE_STORY_ID_LIST,
    storyIdList: storyIdList,
    category: category
  }
}

function requestTopStoryList() {
  debugger
  return {
    type: REQUEST_STORY
  }
}


function requestStart(content) {
  return {
    type: REQUEST_HTTP_START,
    content
  }
}

export function fetchTopStoryList() {
  return (dispatch)=> {
    dispatch(requestTopStoryList());

    get_data('https://hacker-news.firebaseio.com/v0/topstories.json', (storyIdList)=> {
      dispatch(receiveStoryIdList(storyIdList, 'topnews'));
      let pagination = new Paginate(storyIdList, 1);
      dispatch(fetchStoryList(pagination.currentPageItems, 'topnews'))
    })
  }
}

export function fetchStoryList(storyIdList, category) {
  return dispatch => {
    dispatch(requestStart('STORY_LIST'));
    async.map(storyIdList, (storyId, cb)=> {
      get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
        return cb(null, res);
      })
    }, (err, result)=> {
      dispatch(receiveStoryList(result, category))
    })
  }
}

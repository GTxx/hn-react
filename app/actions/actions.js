import { get_data, Paginate } from './../utils.js';
import { HackerNews } from '../agent.js';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const REQUEST_STORY = 'REQUEST_STORY';
export const RECEIVE_STORY = 'RECEIVE_STORY';
export const REQUEST_HTTP_START = 'REQUEST_HTTP_START';
export const REQUEST_HTTP_SUCCESS = 'REQUEST_HTTP_SUCCESS';

export const RECEIVE_STORY_LIST = 'RECEIVE_STORY_LIST';
export const RECEIVE_STORY_ID_LIST = 'RECEIVE_STORY_ID_LIST';
export const RECEIVE_STORY_COMMENTS = 'RECEIVE_STORY_COMMENTS';

export const FETCH_TOPNEWS = 'FETCH_TOPNEWS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const FETCH_SHOWS = 'FETCH_SHOWS';

export const SWITCH_PAGE = 'SWITCH_PAGE';


function requestStory(requestType) {
  return { type: 'isFetching', requestType };
}

function receiveStoryList(storyList, category) {
  return {
    type: RECEIVE_STORY_LIST,
    storyList,
    receiveAt: Date.now()
  };
}

export function receiveStoryIdList(storyIdList, category) {
  return {
    type: RECEIVE_STORY_ID_LIST,
    storyIdList: storyIdList,
    category: category
  };
}

function requestStart(content) {
  return {
    type: REQUEST_HTTP_START,
    content
  };
}

function requestDone(content) {
  return {
    type: REQUEST_HTTP_SUCCESS,
    content
  };
}

function switchPage(pageNum) {
  return {
    type: SWITCH_PAGE,
    pageNum
  };
}

const CATEGORY_URL = {
  topnews: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  jobs: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
  asks: 'https://hacker-news.firebaseio.com/v0/askstories.json',
  newstories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
  show: 'https://hacker-news.firebaseio.com/v0/showstories.json'
};


export function fetchCategoryStoryIdList(category) {
  // 获取类别下的story id，并获取第一页的数据
  return dispatch => {
    dispatch(requestStart(category));

    get_data(CATEGORY_URL[category], storyIdList => {
      dispatch(receiveStoryIdList(storyIdList, category));
      dispatch(switchPage(1));
      dispatch(requestDone(category));

      let pagination = new Paginate(storyIdList, 1);
      dispatch(fetchStoryListIfNeed(pagination.currentPageItems, category));
    });
  };
}

function shouldFetchStoryList(state, storyIdList) {
  let notFetchedStoryIdList = storyIdList.filter(storyId => !state.story[storyId]);
  return notFetchedStoryIdList;
}

export function fetchStoryListIfNeed(storyIdList) {
  return (dispatch, getState) => {
    let notFetchedStoryIdList = shouldFetchStoryList(getState(), storyIdList);
    if (notFetchedStoryIdList.length) {
      return dispatch(fetchStoryList(notFetchedStoryIdList));
    }
  };
}
export function fetchStoryList(storyIdList) {
  return dispatch => {
    dispatch(requestStart('STORY_LIST'));

    let promises = storyIdList.map(
      storyId => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then(response => response.json())
      );
    Promise.all(promises)
      .then(all_json => {
        dispatch(receiveStoryList(all_json));
        dispatch(requestDone(storyIdList));
      });
  };
}

export function switchPageFetchStoryList(storyIdList, pageNum) {
  return dispatch => {
    dispatch(switchPage(pageNum));
    dispatch(fetchStoryListIfNeed(storyIdList));
  };
}

function receiveStoryComments(data) {
  return {
    type: RECEIVE_STORY_COMMENTS,
    data
  };
}

export function fetchStoryComments(id) {
  return dispatch => {
    return HackerNews.storyComment(id).then(response => {
      if (response.ok) {
        response.json().then(
          data => dispatch(receiveStoryComments(data)));
      }
      return response;
    });
  };
}

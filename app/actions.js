import async from 'async';

const SELECT_CATEGORY = 'SELECT_CATEGORY';
const REQUEST_STORY = 'REQUEST_STORY';
const RECEIVE_STORY = 'RECEIVE_STORY';

const RECEIVE_STORY_LIST_AND_STORY = 'RECEIVE_STORY_LIST_AND_STORY';


function requestStory(requestType){
  return {type: 'isFetching', requestType}
}

function receiveStories(storyIDList, storyList){
  return {
    type: 'RECEIVE_STORIES',
    storyIDList,
    storyList: storyList,
    receiveAt: Date.now()
  }
}

function receiveStoryList(storyList){
  return {
    type: 'RECEIVE_STORY_LIST',
    storyList,
    receiveAt: Date.now()
  }
}

// thunk action
export function fetchStories(storyIdList){
  //获取多个story
  return (dispatch) => {
    //开始获取story list
    dispatch(startHTTPRequest('storyIdList'));

    async.map(storyIdList, (storyId, cb)=>{
      get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
        return cb(null, res);
      })
    }, (err, result)=> {
      dispatch(receiveStories(storyIdList, result))
    })
  }
}

export function fetchStoryList(category){
  return (dispatch)=>{
    dispatch(startHTTPRequest(category));

    get_data('https://hacker-news.firebaseio.com/v0/topstories.json', (res)=>{
      dispatch(receiveStoryList(res))
    })
  }
}

export function receiveStoryListAndStory(storyList, result){
  return {
    type: RECEIVE_STORY_LIST_AND_STORY,
    storyList,
    stories: result
  }
}

function requestTopStoryList(){
  return {
    type: REQUEST_STORY
  }
}
export function fetchTopStoryList(){
  return (dispatch)=>{
    dispatch(requestTopStoryList());

    get_data('https://hacker-news.firebaseio.com/v0/topstories.json', (storyList)=>{
      let pagination = new Paginate(storyList, 1);
        async.map(pagination.currentPageItems, (storyId, cb)=>{
          get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=>{
          dispatch(receiveStoryListAndStory(storyList, result))
        })
    })
  }
}

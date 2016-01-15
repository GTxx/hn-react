import async from 'async';

const SELECT_CATEGORY = 'SELECT_CATEGORY';
const REQUEST_


function startHTTPRequest(requestType){
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

export function fetchStories(storyIdList){
  //获取多个story
  return (dispatch) => {
    //开始获取story list
    dispatch(startHTTPRequest('storyIdList'));

    async.map(pagination.currentPageItems, (storyId, cb)=>{
      get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
        return cb(null, res);
      })
    }, (err, result)=> {
      dispatch(receiveStories(storyIdList, res))
    })
  }
}
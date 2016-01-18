import React from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import async from 'async';

import {ItemList} from './component.jsx';
import {get_data, Paginate} from './utils.js'
import {StoryList} from './storyList.jsx';


class TopStory extends React.Component {

  //componentDidMount(){
  //  const {dispatch, }
  //}
  render() {
    let params = {category: 'topnews'}
    return (
      <div>
        <p>123</p>
        <StoryList params={params} />
      </div>)
  }
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

function mapStateToProps(state){
  const {story} = state;
  return story;
}

import {fetchTopStoryList} from './actions.js';

function mapDispatchToProps(dispatch){
  return {fetchStories: ()=> dispatch(fetchTopStoryList(storyIDList))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopStory);

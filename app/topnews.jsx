import React from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import async from 'async';

import {ItemList} from './component.jsx';
import {get_data, Paginate} from './utils.js'
import {StoryList} from './storyList.jsx';


class TopStory extends React.Component {

  render() {
    let params = {category: 'topnews'}
    return (<StoryList params={params} />)
  }
}

function mapStateToProps(state){
  return {
    isFetching: false,
    storyList: [],
    item: {}
  }
}

import {fetchStories} from './actions.js';

function mapDispatchToProps(dispatch){
  return {fetchStories: (storyIDList)=> dispatch(fetchStories(storyIDList))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopStory);

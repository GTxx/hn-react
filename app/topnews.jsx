import React, {PropTypes} from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import async from 'async';

import {ItemList} from './component.jsx';
import {get_data, Paginate} from './utils.js'
import {StoryList} from './storyList.jsx';


class TopStory extends React.Component {

  componentDidMount(){
    const {fetchStories} = this.props
    fetchStories()
  }
  render() {
    console.log(this.props.story)
    return (
      <Loader loaded={!this.props.story.isFetching}>
        <div>
          <StoryList loaded={!this.props.story.isFetching} storyList={this.props.story.storyList}
                     stories={this.props.story.stories} />
        </div>
      </Loader>
    )
  }
}

TopStory.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  fetchStoryList: PropTypes.func.isRequired,
  fetchStoryIdsStoryList: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const {story, } = state;
  if (!story){
    return {
      isFetching: true,
      storyList: [],
      stories: []
    }
  }
  return {story};
}

import {fetchTopStoryList} from './actions.js';


function mapDispatchToProps(dispatch){
  return {
    fetchStoryIdsStoryList: () => dispatch(fetchTopStoryList()),
    fetchStoryList: (storyIdList) => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopStory);

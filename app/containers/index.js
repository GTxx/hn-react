import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import {StoryList} from '../components/storyList.jsx';
import {fetchCategoryStoryIdList, switchPageFetchStoryList} from '../actions/actions.js';
import {Paginate} from '../utils.js';

class StoryListContainer extends React.Component {
  render() {
    const {storyIdList, isFetching, storyList, currentPage} = this.props
    return (
      <Loader loaded={!isFetching}>
        <StoryList storyList={storyList} storyIdList={storyIdList} currentPage={currentPage}/>
      </Loader>)
  }
}

StoryListContainer.propTypes = {
  storyIdList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  storyList: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired
};

function mapStateToProps(category) {
  return (state) => {
    const {currentPage, story, fetchState, categoryStory} = state;
    let storyIdList = categoryStory[category];
    let pagination = new Paginate(storyIdList, currentPage);
    let storyList = pagination.currentPageItems.map((storyId)=>{
      return story[storyId];
    });
    return {
      storyIdList,
      isFetching: fetchState.isFetching,
      currentPage: currentPage,
      storyList
    };
  }
}

class Job extends StoryListContainer {
  componentDidMount() {
    this.props.dispatch(fetchCategoryStoryIdList('jobs'));
  }
}

Job = connect(mapStateToProps('jobs'))(Job)

class TopStory extends StoryListContainer {
  componentDidMount() {
    this.props.dispatch(fetchCategoryStoryIdList('topnews'));
  }
}

TopStory = connect(mapStateToProps('topnews'))(TopStory);


class News extends StoryListContainer {
  componentDidMount() {
    this.props.dispatch(fetchCategoryStoryIdList('newstories'));
  }
}

News = connect(mapStateToProps('newstories'))(News);

class Ask extends StoryListContainer {
  componentDidMount() {
    this.props.dispatch(fetchCategoryStoryIdList('asks'));
  }
}

Ask = connect(mapStateToProps('asks'))(Ask);

class Show extends StoryListContainer {
  componentDidMount() {
    this.props.dispatch(fetchCategoryStoryIdList('show'));
  }
}

Show = connect(mapStateToProps('show'))(Show);

export {TopStory, Job, Ask, Show, News};



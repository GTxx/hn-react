import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import {Pagination} from 'react-bootstrap';

import {ItemList} from '../components/component.jsx';
import {fetchCategoryStoryIdList, switchPageFetchStoryList, fetchStoryListIfNeed}
  from '../actions/actions.js';
import {Paginate} from '../utils.js';

class StoryListContainer extends React.Component {

  static propTypes =  {
    storyIdList: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    httpReqNum: PropTypes.number.isRequired,
    storyList: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired
  };

  handlePageSelect(event, selectedEvent) {
    let selectedPage = selectedEvent.eventKey;
    if (this.props.currentPage != selectedPage) {
      let pagination = new Paginate(this.props.storyIdList, selectedPage);
      this.props.dispatch(switchPageFetchStoryList(pagination.currentPageItems, selectedPage))
    }
  }
  render() {
    const {storyIdList, httpReqNum, isFetching, storyList, currentPage} = this.props;
    let total_page = Math.ceil(storyIdList.length / 10);
    return (
      <Loader loaded={httpReqNum == 0}>
        <ItemList data={storyList} />
        <Pagination
          prev={true}
          next={true}
          first={true}
          last={true}
          ellipsis={true}
          items={total_page}
          maxButtons={Math.min(10, total_page)}
          activePage={currentPage}
          onSelect={this.handlePageSelect.bind(this)}
          />
      </Loader>)
  }
}

function mapStateToProps(category) {
  return (state) => {
    const {currentPage, story, fetchState, categoryStory} = state;
    let storyIdList = categoryStory[category];
    let pagination = new Paginate(storyIdList, currentPage);
    let storyList = pagination.currentPageItems.map(storyId => story[storyId]).filter(story=>story)
    return {
      storyIdList,
      isFetching: fetchState.isFetching,
      httpReqNum: fetchState.httpReqNum,
      currentPage,
      storyList
    };
  }
}

let HighOrderStoryList = category => class extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCategoryStoryIdList(category));
  }

  render(){
    const TopStoryStoryContainer = connect(mapStateToProps(category))(StoryListContainer)
    return (<TopStoryStoryContainer />)
  }
}

let TopStory = HighOrderStoryList('topnews')
TopStory = connect()(TopStory)

let News = HighOrderStoryList('newstories')
News = connect()(News)

let Ask = HighOrderStoryList('asks')
Ask = connect()(Ask)

let Show = HighOrderStoryList('show')
Show = connect()(Show)


let Job = HighOrderStoryList('jobs')
Job = connect()(Job)

export {TopStory, Job, Ask, Show, News};



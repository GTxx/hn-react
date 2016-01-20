import {ItemList} from './component.jsx';
import React, {PropTypes} from 'react';
import {Pagination} from 'react-bootstrap';
import Loader from 'react-loader';
import async from 'async';
import {connect} from 'react-redux';
import {get_data, Paginate} from './../utils.js';
import store from './../main.js';
import {switchPageFetchStoryList} from './../actions/actions.js';


class StoryList extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageSelect = this.handlePageSelect.bind(this)
    //this.getInitData = this.getInitData.bind(this);
  }

  handlePageSelect(event, selectedEvent) {
    let selectedPage = selectedEvent.eventKey;
    debugger
    if (this.props.currentPage != selectedPage) {
      let pagination = new Paginate(this.props.storyIdList, selectedPage);
      this.props.dispatch(switchPageFetchStoryList(pagination.currentPageItems, selectedPage))
    }
  }

  render() {
    const {storyIdList, storyList, currentPage} = this.props;
    let total_page = Math.ceil(this.props.storyIdList.length / 10);
    return (
      <div className='newsList'>
        <ItemList data={storyList}/>
        <Pagination
          prev={true}
          next={true}
          first={true}
          last={true}
          ellipsis={true}
          items={storyIdList.length}
          maxButtons={Math.min(10, total_page)}
          activePage={currentPage}
          onSelect={this.handlePageSelect}
          />
      </div>
    )
  }
}

StoryList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  storyIdList: PropTypes.array.isRequired,
  storyList: PropTypes.array.isRequired
};

StoryList = connect()(StoryList);

export {StoryList};

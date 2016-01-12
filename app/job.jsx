import {ItemList} from './component.jsx';
import React from 'react';
import {Pagination} from 'react-bootstrap';
import async from 'async';
import {get_data, Paginate} from './utils.js';
import Loader from 'react-loader';


class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {storyList: [], currentPage: 0, loaded: false, currentPageData: []};
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .then((response)=> response.json())
      .then(data => {
        let pagination = new Paginate(data, 1);
        async.map(pagination.currentPageItems, (itemId, cb)=> {
          get_data(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=> {
          this.setState({storyList: data, currentPage: 1, loaded: true, currentPageData: result})
        })
      })
  }

  handlePageSelect(event, selectedEvent) {
    if (this.state.currentPage != selectedEvent.eventKey) {
      this.setState({currentPage: selectedEvent.eventKey, loaded: false})
      let pagination = new Paginate(this.state.storyList, selectedEvent.eventKey)
        async.map(pagination.currentPageItems, (itemId, cb)=> {
          get_data(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=> {
          this.setState({loaded: true, currentPageData: result})
        })
    }
  }

  render() {
    let total_page = Math.ceil(this.state.storyList.length / 10);
    return (
      <Loader loaded={this.state.loaded}>
        <div className='newsList'>
          <ItemList data={this.state.currentPageData}/>
          <Pagination
            prev={true}
            next={true}
            first={true}
            last={true}
            ellipsis={true}
            items={total_page}
            maxButtons={Math.min(10, total_page)}
            activePage={this.state.currentPage}
            onSelect={this.handlePageSelect}
            />
        </div>
      </Loader>
    )
  }
}

export {Jobs}


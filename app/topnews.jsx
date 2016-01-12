import React from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {ItemList} from './component.jsx';
import {get_data} from './utils.js'
import Loader from 'react-loader';
import async from 'async';


class TopStory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {storyList: [], currentPage: 0, loaded: false}
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  componentDidMount() {
    get_data('https://hacker-news.firebaseio.com/v0/topstories.json', (res) => {
      let state = {storyList: res, currentPage: 1, loaded: false};
      let storyOfCurrentPage = state.storyList.slice((state.currentPage - 1) * 10, state.currentPage * 10);
      async.map(storyOfCurrentPage, (itemId, cb)=> {
        get_data(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`, function (res) {
          return cb(null, res);
        })
      }, (err, result)=> {
        debugger
        this.setState({storyList: res, currentPage: 1, loaded: true, currentPageData: result})
      })
    })
  }

  handlePageSelect(event, selectedEvent) {
    if (this.state.currentPage != selectedEvent.eventKey) {
      let currentPage = selectedEvent.eventKey;
      this.setState({currentPage, loaded: false});

      let storyOfCurrentPage = this.state.storyList.slice((currentPage - 1) * 10, currentPage * 10);
      async.map(storyOfCurrentPage, (itemId, cb)=> {
        get_data(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`, function (res) {
          return cb(null, res);
        })
      }, (err, result)=> {
        this.setState({loaded: true, currentPageData: result})
      })

    }
  }

  render() {
    let total_page = Math.ceil(this.state.storyList.length / 10)
    return (
      <Loader loaded={this.state.loaded}>
        <div className="newsList">
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

export {TopStory};

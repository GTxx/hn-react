import {ItemList} from './component.jsx';
import {Pagination} from 'react-bootstrap';
import {get_data, Paginate} from './utils.js';
import ReactBootstrap from 'react-bootstrap';
import React from 'react';
import Loader from 'react-loader';
import async from 'async';


class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {storyList: [], currentPage: 0, loaded: false}
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/askstories.json')
      .then((response)=> {
        return response.json()
      })
      .then((data)=> {
        let state = {storyList: data, currentPage: 1};
        let pagination = new Paginate(data, 1)
        async.map(pagination.currentPageItems, (itemId, cb)=> {
          get_data(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=> {
          let state1 = Object.assign({}, this.state, state, {currentPageData: result, loaded: true})
          this.setState({...state1})
        })
      })
  }

  handlePageSelect(event, selectedEvent) {
    if (this.state.currentPage != selectedEvent.eventKey) {
      let currentPage = selectedEvent.eventKey;
      this.setState({currentPage, loaded: false})
      let pagination = new Paginate(this.state.storyList, currentPage)
      async.map(pagination.currentPageItems, (itemId, cb)=> {
          get_data(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=> {
          this.setState({currentPageData: result, loaded: true})
        })
    }
  }

  render() {
    let total_page = Math.ceil(this.state.storyList.length / 10)
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

export {Ask}

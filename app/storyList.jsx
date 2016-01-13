import {ItemList} from './component.jsx';
import React from 'react';
import {Pagination} from 'react-bootstrap';
import Loader from 'react-loader';
import async from 'async';
import {get_data, Paginate} from './utils.js';

const CategoryUrl = {
  topnews: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  jobs: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
  asks: 'https://hacker-news.firebaseio.com/v0/askstories.json',
  newstories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
  show: 'https://hacker-news.firebaseio.com/v0/showstories.json'
};

class StoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {storyList: [], currentPage: 0, loaded: false}
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.getInitData = this.getInitData.bind(this);
  }

  getInitData(url){
    fetch(url)
      .then((response)=> {
        return response.json();
      })
      .then((data)=> {
        this.setState({storyList: data, currentPage: 1})
        let pagination = new Paginate(data, 1);
        async.map(pagination.currentPageItems, (storyId, cb)=>{
          get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=>{
          this.setState({loaded: true, storyList: data, currentPage: 1, currentPageData: result})
        })
      })
  }

  componentDidMount() {
    let url = CategoryUrl[this.props.params.category]
    this.getInitData(url)
  }

  componentWillReceiveProps(){
    let url = CategoryUrl[this.props.params.category]
    this.setState({loaded: false})
    this.getInitData(url)
  }

  handlePageSelect(event, selectedEvent) {
    let currentPage = selectedEvent.eventKey;
    if (this.state.currentPage != currentPage){
      this.setState({loaded: false, currentPage})
      let pagination = new Paginate(this.state.storyList, currentPage)
      async.map(pagination.currentPageItems, (storyId, cb)=>{
        get_data(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, function (res) {
            return cb(null, res);
          })
        }, (err, result)=>{
          this.setState({loaded: true, currentPage, currentPageData: result})
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

export {StoryList}

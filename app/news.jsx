import {ItemList} from './component.jsx';
import React from 'react';
import request from 'superagent';
import {Pagination} from 'react-bootstrap';

class NewStory extends React.Component {
  constructor(props){
    super(props);
    this.state = {storyList: [], currentPage: 0}
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }
  componentDidMount() {
    request.get('https://hacker-news.firebaseio.com/v0/newstories.json')
      .end(function(err, res){
        if (res.ok){
          this.setState({storyList: res.body, currentPage: 1})
        }else{
          console.log('request news, ', err)
        }
      }.bind(this))
  }
  handlePageSelect(event, selectedEvent){
    this.setState({currentPage: selectedEvent.eventKey})
  }
  render() {
    let page = this.state.currentPage;
    let story_in_current_page = this.state.storyList.slice((page - 1) * 10, page * 10);
    return (
      <div className='newsList'>
        <ItemList data={story_in_current_page}/>
        <Pagination
          prev={true}
          next={true}
          first={true}
          last={true}
          ellipsis={true}
          items={this.state.storyList.length}
          maxButtons={10}
          activePage={this.state.currentPage}
          onSelect={this.handlePageSelect}
          />
      </div>
    )
  }
}

export {NewStory, };


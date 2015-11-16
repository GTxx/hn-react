import {ItemList} from './component.jsx';
import React from 'react';
import {Pagination} from 'react-bootstrap';

class Jobs extends React.Component{
  constructor (props) {
    super(props);
    this.state = {storyList: [], currentPage: 0}
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }
  componentDidMount () {
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        this.setState({storyList: data, currentPage: 1})
      })
  }

  handlePageSelect(event, selectedEvent){
    if (this.state.currentPage != selectedEvent.eventKey){
      this.setState({currentPage: selectedEvent.eventKey})
    }
  }
  render() {
    let page = this.state.currentPage;
    let total_page = Math.ceil(this.state.storyList.length/10);
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
          items={total_page}
          maxButtons={Math.min(10, total_page)}
          activePage={this.state.currentPage}
          onSelect={this.handlePageSelect}
          />
      </div>
    )
  }
}

export {Jobs}


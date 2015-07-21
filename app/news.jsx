import {ItemList, Paginator} from './component.jsx';
import React from 'react';
import $ from 'jquery';

class NewStory extends React.Component {
  constructor(props){
    super(props);
    this.state = {storyList: [], currentPage: 0}
  }
  componentDidMount() {
    $.get('https://hacker-news.firebaseio.com/v0/newstories.json')
      .done(function (data) {
        this.setState({storyList: data, currentPage: 1});
      }.bind(this))
      .fail(function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      })
  }
  render() {
    let page = this.state.currentPage;
    let story_in_current_page = this.state.storyList.slice((page - 1) * 10, page * 10);
    return (
      <div className='newsList'>
        <ItemList data={story_in_current_page}/>
        <Paginator storyList={this.state.storyList}/>
      </div>
    )
  }
}

export {NewStory, };


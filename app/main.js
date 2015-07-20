import React from 'react';
import $ from 'jquery';
import {TopStory, ItemList, Paginator} from './component.jsx';
import {Router, Route, Link} from 'react-router';
import ReactRouter from 'react-router';

class Comment extends React.Component{
  render() {
    return (<div>comment to be done</div>)
  }
}

class Header extends React.Component{
  render () {
    return (
      <div>
        <ul >
          <li><Link to='topstory'>Hacker News</Link></li>
          <li><Link to='newstory'>new</Link></li>
          <li><Link to='show'>show</Link></li>
          <li><Link to='ask'>ask</Link></li>
          <li><Link to='jobs'>jobs</Link></li>
        </ul>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Header />
        <ReactRouter.RouteHandler />
      </div>
    )
  }
}

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

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {storyList: [], currentPage: 0}
  }
  componentDidMount() {
    $.get(' https://hacker-news.firebaseio.com/v0/showstories.json')
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

class Ask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {storyList: [], currentPage: 0}
  }
  componentDidMount() {
    $.get('https://hacker-news.firebaseio.com/v0/askstories.json')
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

class Jobs extends React.Component{
  constructor (props) {
    super(props);
    this.state = {storyList: [], currentPage: 0}
  }
  componentDidMount () {
    $.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
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

let routers = (
  <Route handler={App}>
    <Route path='/' name='topstory' handler={TopStory}/>
    <Route path='/newstory' name='newstory' handler={NewStory}/>
    <Route path='/show' name='show' handler={Show}/>
    <Route path='/ask' name='ask' handler={Ask}/>
    <Route path='/jobs' name='jobs' handler={Jobs}/>
  </Route>
);

ReactRouter.run(routers, ReactRouter.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('content'));
});

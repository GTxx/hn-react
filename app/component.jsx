var React = require('react');
var $ = require('jquery');
var ReactBootstrap = require('react-bootstrap');
var moment = require('moment');
import {Panel, Badge, Pagination} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');

class TopStory extends React.Component{
  constructor(props){
    super(props);
    this.state = {storyList: [], currentPage: 0}
  }
  componentDidMount() {
    $.get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .done(function (data) {
        console.log(data);
        this.setState({
          storyList: data,
          currentPage: 1
        });
      }.bind(this))
      .fail(function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      })
  }
  render() {
    let page = this.state.currentPage;
    var story_in_current_page = this.state.storyList.slice((page - 1) * 10, page * 10)
    return (
      <div className="newsList">
        <ItemList data={story_in_current_page}/>
        <Paginator storyList={this.state.storyList}/>
      </div>
    )
  }
}

class ItemList extends React.Component {
  render() {
    var storyNodes = this.props.data.map(function (itemId, index) {
      return (<Item itemId={itemId} key={index}/>)
    });
    return (
      <div className="newsNodes">{storyNodes}</div>
    );
  }
}

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: []}
  }
  componentDidMount() {
    $.get('https://hacker-news.firebaseio.com/v0/item/' + this.props.itemId + '.json')
      .done(function (data) {
        this.setState({data: data})
      }.bind(this))
      .fail(function (xhr, status, err) {
        console.error(this.props.itemId, status, err.toString());
      })
  }
  render() {
    var _tmp = document.createElement('a');
    _tmp.href = this.state.data.url;
    var domain = _tmp.hostname;
    return (
      <Panel
        header={<h4><a href={this.state.data.url}>{this.state.data.title}</a> ({domain}) | {this.state.data.type}</h4>}>
        <Badge>
          {this.state.data.score}
        </Badge> points by {this.state.data.by} in {moment.unix(this.state.data.time).fromNow()} |
        <Badge>{this.state.data.descendants}</Badge> comments
      </Panel>
    )
  }
}

class Paginator extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentPage: 1};
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(event, selectedEvent) {
    console.log(event)
    console.log(selectedEvent)
    this.setState({currentPage: selectedEvent.eventKey});
  }
  render() {
    return (
      <Pagination
        prev={true}
        next={true}
        first={true}
        last={true}
        ellipsis={true}
        items={this.props.storyList.length}
        maxButtons={10}
        activePage={this.state.currentPage}
        onSelect={this.handleSelect}
        />
    )
  }
}

export {TopStory, ItemList,  Paginator};

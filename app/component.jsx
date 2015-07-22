var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var moment = require('moment');
import {Panel, Badge, Pagination} from 'react-bootstrap';
import request from 'superagent';
import {Link} from 'react-router';
require('bootstrap/dist/css/bootstrap.css');

class TopStory extends React.Component{
  constructor(props){
    super(props);
    this.state = {storyList: [], currentPage: 0}
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }
  componentDidMount() {
    request.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .end(function(err, res){
        if(res.ok){
          this.setState({storyList: res.body, currentPage: 1})
        }else{
          console.log('request topstory, ', err)
        }
      }.bind(this))
  }
  handlePageSelect(event, selectedEvent) {
    console.log(event)
    console.log(selectedEvent)
    this.setState({currentPage: selectedEvent.eventKey});
    console.log(this.state)
  }
  render() {
    let page = this.state.currentPage;
    console.log(page);
    var story_in_current_page = this.state.storyList.slice((page - 1) * 10, page * 10)
    console.log(story_in_current_page)
    return (
      <div className="newsList">
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

class ItemList extends React.Component {
  render() {
    var storyNodes = this.props.data.map(function (itemId, index) {
      return (<Item itemId={itemId} key={index}/>)
    });
    console.log('render itemlist')
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
    console.log('render item ', this.props.itemId)

    request.get('https://hacker-news.firebaseio.com/v0/item/' + this.props.itemId + '.json')
      .end(function(err, res){
        if(res.ok){
          this.setState({data: res.body})
        }else{
          console.log('request item ', this.props.itemId, 'fail. ', err)
        }
      }.bind(this))
  }
  componentWillReceiveProps(nextProps){
    console.log('render item again', nextProps.itemId)
    request
      .get('https://hacker-news.firebaseio.com/v0/item/' + nextProps.itemId + '.json')
      .end(function(err, res){
        console.log(err, res)
        if(res.ok){
          this.setState({data: res.body})
        }else{
          console.log('request item ', nextProps.itemId, 'fail. ', err)
        }
      }.bind(this))
  }
  render() {
    var _tmp = document.createElement('a');
    _tmp.href = this.state.data.url;
    var domain = _tmp.hostname;
    let params = {id: this.state.data.by}
    return (
      <Panel
        header={<h4><a href={this.state.data.url}>{this.state.data.title}</a> ({domain}) | {this.state.data.type}</h4>}>
        <Badge>{this.state.data.score}</Badge> points by <a href={`#/user/${this.state.data.by}`}> {this.state.data.by}</a> in {moment.unix(this.state.data.time).fromNow()} |
        <a href={`#/story/${this.state.data.id}`}><Badge>{this.state.data.descendants}</Badge> comments</a>
      </Panel>
    )
  }
}

export {TopStory, ItemList, Item};

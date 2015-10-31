var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var moment = require('moment');
import {Panel, Badge, Pagination} from 'react-bootstrap';
import request from 'superagent';
import {Link} from 'react-router';
import {get_data} from './utils.js'
import {Col} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');


class ItemList extends React.Component {
  render() {
    var storyNodes = this.props.data.map(function (itemId, index) {
      return (<Item itemId={itemId} key={index} />)
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
    get_data(`https://hacker-news.firebaseio.com/v0/item/${this.props.itemId}.json`, function(res){
      console.log(this)
      console.log(res)
      this.setState({data: res})
    }.bind(this))
  }
  componentWillReceiveProps(nextProps){
    console.log('render item again', nextProps.itemId)
    fetch(`https://hacker-news.firebaseio.com/v0/item/${nextProps.itemId}.json`)
      .then(function(response){
        this.setState({data: response.body})
      }.bind(this))
    //request
    //  .get('https://hacker-news.firebaseio.com/v0/item/' + nextProps.itemId + '.json')
    //  .end(function(err, res){
    //    console.log(err, res)
    //    if(res.ok){
    //      this.setState({data: res.body})
    //    }else{
    //      console.log('request item ', nextProps.itemId, 'fail. ', err)
    //    }
    //  }.bind(this))
  }
  render() {
    var _tmp = document.createElement('a');
    _tmp.href = this.state.data.url;
    var domain = _tmp.hostname;
    let params = {id: this.state.data.by}
    return (
      <Panel
        header={<h4><a href={this.state.data.url}>{this.state.data.title}</a> ({domain})</h4>}>
        <Badge>{this.state.data.score}</Badge> points by <a href={`#/user/${this.state.data.by}`}> {this.state.data.by}</a> in {moment.unix(this.state.data.time).fromNow()} |
        <a href={`#/story/${this.state.data.id}`}><Badge>{this.state.data.descendants}</Badge> comments</a>
      </Panel>
    )
  }
}

export {ItemList, Item};

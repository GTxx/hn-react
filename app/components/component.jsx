var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var moment = require('moment');
import {Panel, Badge, Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import {get_data} from './../utils.js'
import {Col} from 'react-bootstrap';


class ItemList extends React.Component {

  render() {
    var storyNodes = this.props.data.map(function (item, index) {
      return (<Item key={index} data={item} />)
    });
    return (
      <div className="newsNodes">{storyNodes}</div>
    );
  }
}

class Item extends React.Component {

  render() {
    var _tmp = document.createElement('a');
    _tmp.href = this.props.data.url;
    var domain = _tmp.hostname;
    return (
      <Panel
        header={<h4><a href={this.props.data.url}>{this.props.data.title}</a> ({domain})</h4>}>
        <Badge>{this.props.data.score}</Badge> points by <a href={`#/user/${this.props.data.by}`}> {this.props.data.by}</a> in {moment.unix(this.props.data.time).fromNow()} |
        <Link to={`/story/${this.props.data.id}`}><Badge>{this.props.data.descendants}</Badge> comments</Link>
      </Panel>
    )
  }
}

export {ItemList, Item};

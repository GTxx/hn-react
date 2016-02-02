var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var moment = require('moment');
import {Panel, Badge, Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import {get_data, get_hostname} from './../utils.js'
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

const Item = props => (
  <Panel
    header={<h4><a href={props.data.url}>{props.data.title}</a> ({get_hostname(props.data.url)})</h4>}>
    <Badge>{props.data.score}</Badge> points by <a href={`#/user/${props.data.by}`}> {props.data.by}</a> in {moment.unix(props.data.time).fromNow()} |
    <Link to={`/story/${props.data.id}`}><Badge>{props.data.descendants}</Badge> comments</Link>
  </Panel>
);

export {ItemList, Item};

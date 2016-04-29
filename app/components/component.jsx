import React from 'react';
var moment = require('moment');
import {Panel, Badge} from 'react-bootstrap';
import {Link} from 'react-router';
import {get_hostname} from './../utils.js'


const ItemList = ({data}) => {
  var storyNodes = data.map(function (item, index) {
    return (<Item key={index} data={item}/>)
  });
  return (
    <div className="newsNodes">{storyNodes}</div>
  );
};

const Item = ({data}) => (
  <Panel
    header={<h4><a href={data.url}>{data.title}</a> ({get_hostname(data.url)})</h4>}>
    <Badge>{data.score}</Badge> points by <a href={`/user/${data.by}`}> {data.by}</a>
    in {moment.unix(data.time).fromNow()} |
    <Link to={`/story/${data.id}`}><Badge>{data.descendants}</Badge> comments</Link>
  </Panel>
);

export {ItemList, Item};

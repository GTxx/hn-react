import React from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {ItemList} from './component.jsx';
import {get_data, Paginate} from './utils.js'
import {StoryList} from './storyList.jsx';
import Loader from 'react-loader';
import async from 'async';


class TopStory extends React.Component {

  render() {
    let params = {category: 'topnews'}
    return (<StoryList params={params} />)
  }
}

export {TopStory};

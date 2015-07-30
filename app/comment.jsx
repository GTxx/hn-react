import React from 'react';
import moment from 'moment';
import request from 'superagent';
import {Panel, Badge, Col, Row} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');

class StoryComments extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props)
    this.state = {story: {}}
  }

  componentDidMount() {
    console.log(this.props)
    let id = this.props.params.id;
    request.get(`http://hn.algolia.com/api/v1/items/${id}`)
      .end(function (err, res) {
        if (res.ok) {
          this.setState({story: res.body})
        } else {
          console.log('request story comment, ', err)
        }
      }.bind(this))
  }

  render() {
    function get_length(comments) {
      let len = comments.length;
      for (let comment of comments) {
        len += get_length(comment.children)
      }
      return len;
    }

    let story = this.state.story;
    let comments = []
    let comment_total = 0;
    if (story.hasOwnProperty('children')) {
      let children = story.children
      comment_total = get_length(children);
      children.sort(function (a, b) {
        return a.created_at_i < b.created_at_i
      })
      comments = children.map(function (comment, index) {
        return (<Comment comment={comment} key={index}/>)
      })
    }

    return (
      <Row>
      <Col xs={12}>
        <Panel
          header={<h4><a href={story.url}>{story.title}</a> </h4>}>
          <Badge>{story.points}</Badge> points by <a href={`#/user/${story.author}`}> {story.author}</a>
          in {moment(story.created_at).fromNow()} |
          <Badge>{comment_total}</Badge> comments
        </Panel>
        {comments}
      </Col>
        </Row>
    )
  }
}

class Comment extends React.Component {

  render() {
    let comment = this.props.comment;
    let user_url = `#/user/${comment.author}`;
    let children = comment.children.map(function (child, index) {
      return (<Comment comment={child} key={index}/>)
    })

    return (
      <Panel
        header={<h4><a href={user_url}>{comment.author}</a>  {moment(comment.created_at).fromNow()}</h4>}>
        <div dangerouslySetInnerHTML={{__html: comment.text}}/>
        {children}
      </Panel>
    )
  }
}

class CommentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comment: {}}
  }

  componentDidMount() {
    return
  }

  render() {
    return
  }
}
export {StoryComments, CommentView}
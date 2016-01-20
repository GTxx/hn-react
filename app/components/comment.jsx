import React, {PropTypes} from 'react';
import moment from 'moment';
import {Panel, Badge, Col, Row} from 'react-bootstrap';

class StoryComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {story: {}}
  }

  render() {
    let {story} = this.props;
    function get_length(comments) {
      let len = comments.length;
      for (let comment of comments) {
        len += get_length(comment.children)
      }
      return len;
    }

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

StoryComments.propTypes = {
  story: PropTypes.object.isRequired
};

export class Comment extends React.Component {

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

export {StoryComments}
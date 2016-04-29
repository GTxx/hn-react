import React, { PropTypes } from 'react';
import moment from 'moment';
import { Panel, Badge, Col, Row } from 'react-bootstrap';

const StoryComments = ({ story }) => {
  function getLength(comments) {
    let len = comments.length;
    for (const comment of comments) {
      len += getLength(comment.children);
    }
    return len;
  }

  let comments = [];
  let commentTotal = 0;
  if (story.hasOwnProperty('children')) {
    const children = story.children;
    commentTotal = getLength(children);
    children.sort((a, b) => a.created_at_i < b.created_at_i);
    comments = children.map((comment, index) => (<Comment comment={comment} key={index}/>));
  }
  
  return (
    <Row>
      <Col xs={12}>
        <Panel header={<h4><a href={story.url}>{story.title}</a> </h4>}>
          <Badge>{story.points}</Badge> points by <a href={`/user/${story.author}`}> {story.author}</a>
          in {moment(story.created_at).fromNow() } |
          <Badge>{commentTotal}</Badge> comments
        </Panel>
        {comments}
      </Col>
    </Row>
  );
};

StoryComments.propTypes = {
  story: PropTypes.object.isRequired,
};

const Comment = ({ comment }) => {
  let children = comment.children.map((child, index) => (<Comment comment={child} key={index} />));
  return (
    <Panel
      header={<h4><a href={`/user/${comment.author}`}>{comment.author}</a>{moment(comment.created_at).fromNow() }</h4>}
      >
      <div dangerouslySetInnerHTML={{ __html: comment.text }} />
      {children}
    </Panel>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export { StoryComments };

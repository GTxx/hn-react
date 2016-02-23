import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';

import {StoryComments} from '../components/comment.jsx';
import {fetchStoryComments} from '../actions/actions.js'


class StoryCommentsContainer extends React.Component {

  componentDidMount() {
    let id = this.props.params.id;
    this.props.dispatch(fetchStoryComments(id))
  }

  render() {
    let storyComment = this.props.storyComment[this.props.params.id] || {};
    return (
      <Loader loaded={this.props.httpReqNum==0}>
        <StoryComments story={storyComment}/>
      </Loader>)
  }
}

StoryCommentsContainer.propTypes = {
  storyComment: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  httpReqNum: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  const {storyComment, fetchState} = state;
  return {storyComment, isFetching: fetchState.isFetching, httpReqNum: fetchState.httpReqNum};
}

StoryCommentsContainer = connect(mapStateToProps)(StoryCommentsContainer);

export default StoryCommentsContainer;

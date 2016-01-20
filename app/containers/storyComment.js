import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';

import {StoryComments} from '../components/comment.jsx';
import {fetchStoryComments} from '../actions/actions.js'


class StoryCommentsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let id = this.props.params.id;
    this.props.dispatch(fetchStoryComments(id))
  }

  render() {
    let storyComment = this.props.storyComment[this.props.params.id] || {};
    debugger
    return (
      <Loader loaded={!this.props.isFetching}>
        <StoryComments story={storyComment}/>
      </Loader>)
  }
}

StoryCommentsContainer.propTypes = {
  storyComment: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const {storyComment, fetchState} = state;
  return {storyComment, isFetching: fetchState.isFetching};
}

StoryCommentsContainer = connect(mapStateToProps)(StoryCommentsContainer);

export default StoryCommentsContainer;

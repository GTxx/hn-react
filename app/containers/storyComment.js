import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import { StoryComments } from '../components/comment.jsx';
import { fetchStoryComments } from '../actions/actions.js';


class StoryCommentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    const id = this.props.params.id;
    this.props.dispatch(fetchStoryComments(id))
      .then(response => this.setState({ loaded: true }));
  }

  render() {
    return (
      <Loader loaded={this.state.loaded}>
        <StoryComments story={this.props.storyComment} />
      </Loader>);
  }
}

StoryCommentsContainer.propTypes = {
  storyComment: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  return { storyComment: state.storyComment[props.params.id] || {} };
}

StoryCommentsContainer = connect(mapStateToProps)(StoryCommentsContainer);

export default StoryCommentsContainer;

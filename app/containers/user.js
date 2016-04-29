import React from 'react';
import moment from 'moment';
import Loader from 'react-loader';
import { connect } from 'react-redux';

import { fetchUserProfile } from '../actions/actions';

class UserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    let {username } = this.props.params;
    this.props.dispatch(fetchUserProfile(username))
      .then(response => this.setState({ loaded: true }));
  }
  
  render() {
    const { user } = this.props;
    return (
      <Loader loaded={this.state.loaded}>
        <div>
          <ul>
            <li>user: {user.id}</li>
            <li>created: {moment.unix(user.created).fromNow() }</li>
            <li>karma: {user.karma}</li>
            <li>about: {user.about}</li>
          </ul>
        </div>
      </Loader>
    );
  }
}

UserProfileContainer = connect(
  (state, props) => {
    const { username } = props.params;
    return { user: state.user[username] || {} };
  }
)(UserProfileContainer);

export { UserProfileContainer };

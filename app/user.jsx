import React from 'react';
import request from 'superagent';
import moment from 'moment';

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: {}}
  }
  componentDidMount(){
    console.log(`mount user profile ${this.props}`)
    console.log(this.props)
    let id = this.props.params.id;
    request.get(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
      .end(function(err, res){
        if(res.ok){
          this.setState({user: res.body})
        }else{
          console.log(`request user ${this.props.userId} fail, $(err)`)
        }
      }.bind(this))
  }
  render(){
    return (
      <div>
        <ul>
          <li>user: {this.state.user.id}</li>
          <li>created: {moment.unix(this.state.user.created).fromNow()}</li>
          <li>karma: {this.state.user.karma}</li>
          <li>about: {this.state.user.about}</li>
        </ul>
      </div>
    )
  }
}

export {UserProfile}
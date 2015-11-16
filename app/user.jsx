import React from 'react';
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
    fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        this.setState({user: data})
      })

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
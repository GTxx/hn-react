import React from 'react';
import moment from 'moment';
import request from 'superagent';
import {Panel, Badge} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');

class StoryComments extends React.Component {
  constructor(props){
    super(props);
    //console.log(props)
    this.state = {story: {}}
  }

  componentDidMount(){
    console.log(this.props)
    let id = this.props.params.id;
    request.get(`http://hn.algolia.com/api/v1/items/${id}`)
      .end(function(err, res){
        if(res.ok){
          this.setState({story: res.body})
        }else{
          console.log('request story comment, ', err)
        }
      }.bind(this))
  }

  render() {
    let story = this.state.story;
    let comments = []
    console.log(story)
    if (story.hasOwnProperty('children')) {
      let children = story.children
      console.log(children)
      children.sort(function(a, b){
        return a.created_at_i < b.created_at_i
      })
      console.log(children)
      comments = children.map(function (comment, index) {
        return (<Comment comment={comment} key={index} />)
      })
    }
    console.log(comments)
    //let comments = []

    return (
      <div className='col-sm-12'>
        <Panel
          header={<h4><a href={story.url}>{story.url}</a> | {story.type}</h4>}>
          <Badge>{story.points}</Badge> points by <a href={`#/user/${story.author}`}> {story.author}</a> in {moment(story.created_at).fromNow()} |
          <Badge>{comments.length}</Badge> comments
        </Panel>
        {comments}
      </div>
    )
  }
}

class Comment extends React.Component {

  render(){
    let comment = this.props.comment;
    let user_url = `#/user/${comment.author}`;
    return (
      <Panel
        header={<h4><a href={user_url}>{comment.author}</a>  {moment(comment.created_at).fromNow()}</h4>}>
        <div dangerouslySetInnerHTML={{__html: comment.text}} />
      </Panel>
    )
  }
}

export {StoryComments}
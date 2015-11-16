import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute} from 'react-router';
import {NewStory} from './news.jsx';
import {Show} from './show.jsx';
import {Jobs} from './job.jsx';
import {Ask} from './ask.jsx';
import {Nav, NavItem, Col, Navbar, NavBrand, Grid, Row} from 'react-bootstrap';
import {UserProfile} from './user.jsx';
import {StoryComments, Comment} from './comment.jsx'
import {TopStory} from './topnews.jsx';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeKey: '#/'}
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selectedKey) {
    console.log(selectedKey);
    this.setState({activeKey: selectedKey})
    location.href = selectedKey;
  }

  render() {
    return (
      <Navbar>
        <NavBrand><a href='#'>Hacker News</a></NavBrand>
        <Nav>
          <NavItem eventKey={'#/newstory'} href='#/newstory'>newstory</NavItem>
          <NavItem eventKey={'#/show'} href='#/show'>show</NavItem>
          <NavItem eventKey={'#/ask'} href='#/ask'>ask</NavItem>
          <NavItem eventKey={'#/jobs'} href='#/jobs'>jobs</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row><Col><Header /></Col></Row>
        <Row><Col>{this.props.children}</Col></Row>
      </Grid>
    )
  }
}

ReactDOM.render(
  <Router>
    <Route path='/' name='main' component={App}>
      <IndexRoute component={TopStory} />
      <Route path='/newstory' name='newstory' component={NewStory}/>
      <Route path='/show' name='show' component={Show}/>
      <Route path='/ask' name='ask' component={Ask}/>
      <Route path='/jobs' name='jobs' component={Jobs}/>
      <Route path='/user/:id' name='user' component={UserProfile}/>
      <Route path='/story/:id' name='storycomments' component={StoryComments}/>
      <Route path='/comment/:id' name='comment' component={Comment}/>
    </Route>
  </Router>, document.getElementById('content'))

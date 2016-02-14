import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute} from 'react-router';
import {Nav, NavItem, Col, Navbar, NavBrand, Grid, Row} from 'react-bootstrap';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
require('bootstrap/dist/css/bootstrap.css');

import {UserProfile} from './user.jsx';
import {TopStory, Job, Ask, Show, News } from './containers/index.js';
import StoryCommentsContainer from './containers/storyComment.js';
import configureStore, {history, reduxRouterMiddleware} from './store/configureStore.js';


const store = configureStore();

reduxRouterMiddleware.listenForReplays(store);


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeKey: '#/'}
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selectedKey) {
    this.setState({activeKey: selectedKey})
    location.href = selectedKey;
  }

  render() {
    return (
      <Navbar>
        <NavBrand><a href='/'>Hacker News</a></NavBrand>
        <Nav>
          <NavItem eventKey={'#/news/newstory'} href='/news'>newstory</NavItem>
          <NavItem eventKey={'#/news/show'} href='/show'>show</NavItem>
          <NavItem eventKey={'#/ask'} href='/ask'>ask</NavItem>
          <NavItem eventKey={'#/jobs'} href='/jobs'>jobs</NavItem>
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

class NoMatch extends React.Component {
  render() {
    return (<h2>not found</h2>)
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' name='main' component={App}>
        <IndexRoute component={TopStory}/>
        <Route path='/jobs' name='jobs' component={Job}/>
        <Route path='/show' name='show' component={Show}/>
        <Route path='/ask' name='ask' component={Ask}/>
        <Route path='/news' name='news' component={News}/>
        <Route path='/user/:id' name='user' component={UserProfile}/>
        <Route path='/story/:id' name='storycomments' component={StoryCommentsContainer}/>
        <Route path='/comment/:id' name='comment' component={Comment}/>
      </Route>
      <Route path='*' component={NoMatch}/>
    </Router>
  </Provider>, document.getElementById('content'))

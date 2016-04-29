import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { Nav, NavItem, Col, Navbar, NavBrand, Grid, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
require('bootstrap/dist/css/bootstrap.css');

import { UserProfile } from './user.jsx';
import { TopStory, Job, Ask, Show, News } from './containers/index.js';
import StoryCommentsContainer from './containers/storyComment.js';
import configureStore from './store/configureStore.js';


const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: '#/' };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    this.setState({ activeKey: selectedKey });
    location.href = selectedKey;
  }

  render() {
    return (
      <Navbar>
        <NavBrand><Link to="/">Hacker News</Link></NavBrand>
        <Nav onSelect={(key) => browserHistory.push(key)}>
          <NavItem eventKey={'/news'} >newstory</NavItem>
          <NavItem eventKey={'/show'} >show</NavItem>
          <NavItem eventKey={'/ask'} >ask</NavItem>
          <NavItem eventKey={'/jobs'} >jobs</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row><Col><Header /></Col></Row>
        <Row><Col>{this.props.children}</Col></Row>
      </Grid>
    );
  }
}

class NoMatch extends React.Component {
  render() {
    return (<h2>not found</h2>);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" name="main" component={App}>
        <IndexRoute component={TopStory} />
        <Route path="/jobs" name="jobs" component={Job} />
        <Route path="/show" name="show" component={Show} />
        <Route path="/ask" name="ask" component={Ask} />
        <Route path="/news" name="news" component={News} />
        <Route path="/user/:id" name="user" component={UserProfile} />
        <Route path="/story/:id" name="storycomments" component={StoryCommentsContainer} />
        <Route path="/comment/:id" name="comment" component={Comment} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Router>
  </Provider>, document.getElementById('content'));

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {Nav, NavItem, Col, Navbar, NavBrand, Grid, Row} from 'react-bootstrap';
import {UserProfile} from './user.jsx';
import {StoryComments, Comment} from './comment.jsx'
import TopStory from './topnews.jsx';
import {StoryList} from './storyList.jsx';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {syncHistory, routeReducer} from 'redux-simple-router';
import {story} from './reducers.js'
const history = createBrowserHistory();
const reduxRouterMiddleware = syncHistory(history);

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  reduxRouterMiddleware
)(createStore);

const reducer = combineReducers({
  story: story,
  routing: routeReducer
})


const store = createStoreWithMiddleware(reducer, {story: {}})

reduxRouterMiddleware.listenForReplays(store);


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
        <NavBrand><a href='/'>Hacker News</a></NavBrand>
        <Nav>
          <NavItem eventKey={'#/news/newstory'} href='/news/newstories'>newstory</NavItem>
          <NavItem eventKey={'#/news/show'} href='/news/show'>show</NavItem>
          <NavItem eventKey={'#/news/ask'} href='/news/asks'>ask</NavItem>
          <NavItem eventKey={'#/news/jobs'} href='/news/jobs'>jobs</NavItem>
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
    <Router history={history}>
      <Route path='/' name='main' component={App}>
        <IndexRoute component={TopStory}/>
        <Route path='/news/:category' name='news' component={StoryList}/>
        <Route path='/user/:id' name='user' component={UserProfile}/>
        <Route path='/story/:id' name='storycomments' component={StoryComments}/>
        <Route path='/comment/:id' name='comment' component={Comment}/>
      </Route>
      <Route path='*' component={NoMatch}/>
    </Router>
  </Provider>, document.getElementById('content'))

import React from 'react';
import $ from 'jquery';
import {TopStory} from './component.jsx';
import {Router, Route, Link} from 'react-router';
import ReactRouter from 'react-router';
import {NewStory} from './news.jsx';
import {Show} from './show.jsx';
import {Jobs} from './job.jsx';
import {Ask} from './ask.jsx';
import {Nav, NavItem} from 'react-bootstrap';
import {UserProfile} from './user.jsx';


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
      <Nav bsStyle='pills' activeKey={this.state.activeKey} onSelect={this.handleSelect}>
        <NavItem eventKey={'#/'} href='#/'>TopStory</NavItem>
        <NavItem eventKey={'#/newstory'} href='#/newstory'>newstory</NavItem>
        <NavItem eventKey={'#/show'} href='#/show'>show</NavItem>
        <NavItem eventKey={'#/ask'} href='#/ask'>ask</NavItem>
        <NavItem eventKey={'#/jobs'} href='#/jobs'>jobs</NavItem>
      </Nav>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Header />
        <ReactRouter.RouteHandler />
      </div>
    )
  }
}

let routers = (
  <Route handler={App}>
    <Route path='/' name='topstory' handler={TopStory}/>
    <Route path='/newstory' name='newstory' handler={NewStory}/>
    <Route path='/show' name='show' handler={Show}/>
    <Route path='/ask' name='ask' handler={Ask}/>
    <Route path='/jobs' name='jobs' handler={Jobs}/>
    <Route path='/user/:id' name='user' handler={UserProfile}/>
  </Route>
);

ReactRouter.run(routers, ReactRouter.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('content'));
});

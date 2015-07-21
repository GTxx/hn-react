import React from 'react';
import $ from 'jquery';
import {TopStory} from './component.jsx';
import {Router, Route, Link} from 'react-router';
import ReactRouter from 'react-router';
import {NewStory} from './news.jsx';
import {Show} from './show.jsx';
import {Jobs} from './job.jsx';
import {Ask} from './ask.jsx';



class Header extends React.Component{
  render () {
    return (
      <div>
        <ul >
          <li><Link to='topstory'>Hacker News</Link></li>
          <li><Link to='newstory'>new</Link></li>
          <li><Link to='show'>show</Link></li>
          <li><Link to='ask'>ask</Link></li>
          <li><Link to='jobs'>jobs</Link></li>
        </ul>
      </div>
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
  </Route>
);

ReactRouter.run(routers, ReactRouter.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('content'));
});

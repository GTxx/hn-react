let TopStory = React.createClass({
  getInitialState: function(){
    return {storyList: [], currentPage: 0}
  },
  componentDidMount: function(){
    $.get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .done(function(data){
        console.log(data);
        this.setState({
          storyList: data,
          currentPage: 1
        });
      }.bind(this))
      .fail(function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      })
  },
  render: function(){
    let page = this.state.currentPage;
    var story_in_current_page = this.state.storyList.slice((page-1)*10, page*10)
    return (
      <div className="newsList">
        <ItemList data={story_in_current_page} />
        <Paginator storyList={this.state.storyList} />
      </div>
    )
  }
});

var ItemList = React.createClass({
  render: function(){
    var storyNodes = this.props.data.map(function(itemId, index){
      return (<Item itemId={itemId} key={index} />)
    });
    return (
      <div className="newsNodes">{storyNodes}</div>
    );
  }
});

var Item = React.createClass({
  getInitialState: function(){
    return {data: {}};
  },
  componentDidMount: function(){
    $.get('https://hacker-news.firebaseio.com/v0/item/' + this.props.itemId + '.json')
    .done(function(data){
        this.setState({data: data})
      }.bind(this))
    .fail(function(xhr, status, err){
      console.error(this.props.itemId, status, err.toString());
    })
  },
  render: function(){
    var _tmp = document.createElement('a');
    _tmp.href = this.state.data.url;
    var domain = _tmp.hostname;
    return (
      <ReactBootstrap.Panel header={<h4><a href={this.state.data.url}>{this.state.data.title}</a> ({domain}) | {this.state.data.type}</h4>}>
        <ReactBootstrap.Badge>{this.state.data.score}</ReactBootstrap.Badge> points by {this.state.data.by} in {moment.unix(this.state.data.time).fromNow()} | <ReactBootstrap.Badge>{this.state.data.descendants}</ReactBootstrap.Badge> comments
      </ReactBootstrap.Panel>
    )
  }
});

var Paginator = React.createClass({
  getInitialState: function(){
    return {currentPage: 1}
  },
  handleSelect: function(event, selectedEvent){
    this.setState({currentPage: selectedEvent.eventKey});
  },
  render: function(){
    return (
      <ReactBootstrap.Pagination
        prev={true}
        next={true}
        first={true}
        last={true}
        ellipsis={true}
        items={this.props.storyList.length}
        maxButtons={10}
        activePage={this.state.currentPage}
        onSelect={this.handleSelect}
        />
    )
  }
});

var NewsPage = React.createClass({
  render: function(){
    <div className="newsPage">

    </div>
  }
});


let Comment = React.createClass({
  render: function(){
    return (<div>comment to be done</div>)
  }
});

let Header = React.createClass({
  render: function(){
    return (
      <div>
        <ul >
          <li><ReactRouter.Link to='topstory' >Hacker News</ReactRouter.Link></li>
          <li><ReactRouter.Link to='newstory' >new</ReactRouter.Link></li>
          <li><ReactRouter.Link to='show' >show</ReactRouter.Link></li>
          <li><ReactRouter.Link to='ask' >ask</ReactRouter.Link></li>
          <li><ReactRouter.Link to='jobs' >jobs</ReactRouter.Link></li>
        </ul>
      </div>
    )
  }
})

var App = React.createClass({
  render: function(){
    return (
      <div>
        <h1>App</h1>
        <Header />
        <ReactRouter.RouteHandler />
      </div>
    )
  }
});

let NewStory = React.createClass({
  getInitialState: function(){
    return {storyList: [], currentPage: 0}
  },
  componentDidMount: function(){
    $.get('https://hacker-news.firebaseio.com/v0/newstories.json')
      .done(function(data){
        this.setState({storyList: data, currentPage: 1});
      }.bind(this))
      .fail(function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      })
  },
  render: function(){
    let page = this.state.currentPage;
    let story_in_current_page = this.state.storyList.slice((page-1)*10, page*10);
    return (
      <div className='newsList'>
        <ItemList data={story_in_current_page} />
        <Paginator storyList={this.state.storyList} />
      </div>
    )
  }
});

let Show = React.createClass({
  getInitialState: function(){
    return {storyList: [], currentPage: 0}
  },
  componentDidMount: function(){
    $.get(' https://hacker-news.firebaseio.com/v0/showstories.json')
      .done(function(data){
        this.setState({storyList: data, currentPage: 1});
      }.bind(this))
      .fail(function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      })
  },
  render: function(){
    let page = this.state.currentPage;
    let story_in_current_page = this.state.storyList.slice((page-1)*10, page*10);
    return (
      <div className='newsList'>
        <ItemList data={story_in_current_page} />
        <Paginator storyList={this.state.storyList} />
      </div>
    )
  }
});

let Ask = React.createClass({
  getInitialState: function(){
    return {storyList: [], currentPage: 0}
  },
  componentDidMount: function(){
    $.get('https://hacker-news.firebaseio.com/v0/askstories.json')
      .done(function(data){
        this.setState({storyList: data, currentPage: 1});
      }.bind(this))
      .fail(function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      })
  },
  render: function(){
    let page = this.state.currentPage;
    let story_in_current_page = this.state.storyList.slice((page-1)*10, page*10);
    return (
      <div className='newsList'>
        <ItemList data={story_in_current_page} />
        <Paginator storyList={this.state.storyList} />
      </div>
    )
  }
});

let Jobs = React.createClass({
  getInitialState: function(){
    return {storyList: [], currentPage: 0}
  },
  componentDidMount: function(){
    $.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .done(function(data){
        this.setState({storyList: data, currentPage: 1});
      }.bind(this))
      .fail(function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      })
  },
  render: function(){
    let page = this.state.currentPage;
    let story_in_current_page = this.state.storyList.slice((page-1)*10, page*10);
    return (
      <div className='newsList'>
        <ItemList data={story_in_current_page} />
        <Paginator storyList={this.state.storyList} />
      </div>
    )
  }
});

var routers = (
  <ReactRouter.Route handler={App}>
    <ReactRouter.Route path='/' name='topstory' handler={TopStory} />
    <ReactRouter.Route path='/newstory' name='newstory' handler={NewStory} />
    <ReactRouter.Route path='/show' name='show' handler={Show} />
    <ReactRouter.Route path='/ask' name='ask' handler={Ask} />
    <ReactRouter.Route path='/jobs' name='jobs' handler={Jobs} />
  </ReactRouter.Route>
);

ReactRouter.run(routers, ReactRouter.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('content'));
});

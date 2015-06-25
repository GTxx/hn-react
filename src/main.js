var TopStory = React.createClass({
  loadTopStoryFromServer: function(){
    $.ajax({
      url: this.props.url,
      dateType: 'json',
      cache: false,
      success: function(data){
        this.setState({
          storyList: data,
          current_page: 1
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }
    })
  },
  getInitialState: function(){
    return {storyList: [], currentPage: 0}
  },
  componentDidMount: function(){
    this.loadTopStoryFromServer();
  },
  render: function(){
    var page = this.state.current_page;
    var story_in_current_page = this.state.storyList.slice((page-1)*10, page*10)
    return (
      <div className="newsList">
        <NewsList data={story_in_current_page} />
        <Paginator storyList={this.state.storyList} />
      </div>
    )
  }
});

var NewsList = React.createClass({

  render: function(){
    var storyNodes = this.props.data.map(function(storyId, index){
      return (<News storyId={storyId} key={index} />)
    });
    return (
      <div className="newsNodes">{storyNodes}</div>
    );
  }
});

var News = React.createClass({
  loadStoryFromServer: function(){
    $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/item/' + this.props.storyId + '.json',
      dateType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.storyId, status, err.toString());
      }
    })
  },
  getInitialState: function(){
    return {data: {}};
  },
  componentDidMount: function(){
    this.loadStoryFromServer();
  },
  render: function(){
    var _tmp = document.createElement('a');
    _tmp.href = this.state.data.url;
    var domain = _tmp.hostname;
    return (
      <ReactBootstrap.Panel header={<h4><a href={this.state.data.url}>{this.state.data.title}</a> ({domain})</h4>}>
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

React.render(
  <TopStory url="https://hacker-news.firebaseio.com/v0/topstories.json" />,
  $('#content')[0]
);
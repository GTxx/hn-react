var TopStory = React.createClass({
  loadTopStoryFromServer: function(){
    $.ajax({
      url: this.props.url,
      dateType: 'json',
      cache: false,
      success: function(data){
        this.setState({storyList: data.slice(0,10)});
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
    return (
      <div className="newsList">
        <NewsList data={this.state.storyList} />
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
      <div className="news">
        <div>
          <h4><a href={this.state.data.url}>{this.state.data.title}</a></h4>
          <p>({domain})</p>
        </div>

        <p>{this.state.data.score} points by {this.state.data.by} in {moment.unix(this.state.data.time).fromNow()} | {this.state.data.descendants} comments</p>
      </div>
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
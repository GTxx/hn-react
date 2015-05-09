var TopStory = React.createClass({
  loadTopStoryFromServer: function(){
    $.ajax({
      url: this.props.url,
      dateType: 'json',
      cache: false,
      success: function(data){
        this.setState({storyList: data.slice(0, 10)});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }
    })
  },
  getInitialState: function(){
    return {storyList: []}
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
    return (
      <div className="news">
        <span>{this.state.data.title}</span>
        <p>{this.state.data.score}</p>
        <p>{moment.unix(this.state.data.time).format('lll')}</p>
        <p>{this.state.data.by}</p>
      </div>
    )
  }
});

React.render(
  <TopStory url="https://hacker-news.firebaseio.com/v0/topstories.json" />,
  $('#content')[0]
);
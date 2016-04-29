const CategoryUrl = {
  topnews: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  jobs: 'https://hacker-news.firebaseio.com/v0/jobstories.json',
  asks: 'https://hacker-news.firebaseio.com/v0/askstories.json',
  newstories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
  show: 'https://hacker-news.firebaseio.com/v0/showstories.json'
};


const HackerNews = {
  topnews: fetch(CategoryUrl.topnews),
  jobs: fetch(CategoryUrl.jobs),
  asks: fetch(CategoryUrl.asks),
  newstories: fetch(CategoryUrl.newstories),
  show: fetch(CategoryUrl.show),
  story: storyId => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`),
  storyComment: storyId => fetch(`http://hn.algolia.com/api/v1/items/${storyId}`)
};

export { HackerNews };

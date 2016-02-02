function get_data(url, ok_func, fail_func){
  fetch(url)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        if(fail_func) {
          fail_func(response, response.status)
        }
      }
    })
    .then(function(json){
      ok_func(json)
    })
}

class Paginate {
  constructor(itemList, page, perPage=10){
    this.itemList = itemList;
    this.page = page;
    this.perPage = perPage;
  }

  get pageNum(){
    return Math.ceil(this.itemList.length/this.perPage);
  }

  get currentPageItems(){
    if (this.page >0 && this.page <= this.pageNum){
      let start = (this.page-1)*this.perPage;
      let end = Math.min(start + this.perPage, this.itemList.length);
      return this.itemList.slice(start, end)
    }else{
      return []
    }
  }
}

function get_hostname(url){
  var _tmp = document.createElement('a');
  _tmp.href = url;
  return _tmp.hostname;
}

export {get_data, Paginate, get_hostname}
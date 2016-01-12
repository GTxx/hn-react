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
export {get_data}
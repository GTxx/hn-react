import request from 'superagent';

function get_data(url, ok_func, fail_func){
  request.get(url)
    .end(function(err, res){
      if(res.ok){
        ok_func(res)
      }else{
        if (fail_func){
          fail_func(res, err)
        }else{
          console.log(`request ${url} fail, ${err}`)
        }
      }
    })
}

export {get_data}
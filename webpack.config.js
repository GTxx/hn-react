var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathTojquery = path.resolve(node_modules, 'jquery/dist/jquery.min.js');

var deps = [
  'react/dist/react.min.js',
  'react-router/umd/ReactRouter.min.js',
  'moment/min/moment.min.js',
  'jquery/dist/jquery.min.js',
  'react-bootstrap/dist/react-bootstrap.min.js'
];


var config = {
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'app/main.js'),
  ],
  resolve: {
    alias: {}
  },
  //resolve: {
  //  alias: {
  //    'react': pathToReact
  //  }
  //},
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.css$/,

      loader: 'style!css'
    },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ],
    //noParse: [pathToReact, pathTojquery]
    noParse: []
  }
};

//deps.map(function(dep){
//  var depPath = path.resolve(node_modules, dep);
//  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
//  config.module.noParse.push(depPath);
//})

console.log(config);
module.exports = config;
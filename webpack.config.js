var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var config = {
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    // eliminate duplicate
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/[name].css"),
  ],
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'app/main.js'),
  ],
  resolve: {
    alias: {}
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  }
};

module.exports = config;
var path = require('path');
var config = require('./webpack.config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.plugins.push(new webpack.optimize.UglifyJsPlugin());

config.plugins.push(new HtmlWebpackPlugin({
  title: 'HACKER NEWS', filename: 'index.html', hash: true, template: 'index.tpl.html',
  inject: 'body'}))

config.entry = path.resolve(__dirname, 'app/main.js')

module.exports = config
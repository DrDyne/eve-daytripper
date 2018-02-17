"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('../webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  entry: './index.jsx',
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'oauth.[hash:5].js'
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, '../app'),
      mui: 'material-ui',
      muii: 'material-ui-icons',
    },
    extensions: ['.js', '.jsx']
  },
  module: { loaders },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'oauth.html',
      files: {
        css: ['style.css'],
        js: [ "oauth.js"],
      }
    }),
  ]
}

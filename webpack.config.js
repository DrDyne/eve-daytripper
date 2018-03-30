"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8880";

const App = {
  entry: [
    'react-hot-loader/patch',
    './app/index.jsx', // your app's entry point
    //'react-joyride/lib/react-joyride-compiled.css'
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      joi: 'joi-browser',
      moment: 'moment/moment.js',
      App: path.resolve(__dirname, './app'),
      Images: path.resolve(__dirname, './images'),
      mui: 'material-ui',
      muii: 'material-ui-icons',
      'app-locales': './locales'
    },
    extensions: ['.js', '.jsx']
  },
  module: { loaders },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './app/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
}

const Oauth = {
  entry: './oauth/index.jsx',
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public/oauth'),
    filename: 'oauth.[hash:5].js'
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, './app'),
      mui: 'material-ui',
      muii: 'material-ui-icons',
    },
    extensions: ['.js', '.jsx']
  },
  module: { loaders },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './oauth/index.html',
      filename: 'oauth.html',
      files: {
        css: ['style.css'],
        js: [ "oauth.js"],
      },
      favicon: './images/favicon-black.png'
    }),
  ],
  devServer: {
    contentBase: "./oauth/public",
    // do not print bundle build stats
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
}

module.exports = [
  App,
  //Oauth // enable only for debugging the oauth callback page, you should disable App if you do.
]

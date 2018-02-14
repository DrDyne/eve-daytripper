var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    './app/sw-install.js',
    './app/index.jsx',
    './styles/index.scss'
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: 'eve-daytripper.[chunkhash].js'
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
    extensions: ['.js', '.jsx'],
  },
  module: { loaders },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './app/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      }
    })
  ]
};

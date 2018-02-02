const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    getFleet: './get-fleet.js',
    getInventory: './get-inventory.js',
    getGps: './get-gps.js',
    postFleet: './post-fleet.js',
    postInventory: './post-inventory.js',
    postGps: './post-gps.js',
  },
  loader: {
    test: /\.js$/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: "babel-loader"
  },
  externals: {
    'aws-sdk': 'commonjs aws-sdk'
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  output: {
    filename: '[name].lambda.js',
    path: path.resolve(__dirname, 'dist')
  }
};

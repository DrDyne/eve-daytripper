const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {
    getFleet: './get-fleet.js',
    getInventory: './get-inventory.js',
  },
  loader: {
    test: /\.js$/,
    exclude: /(aws-sdk|node_modules|bower_components|public\/)/,
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

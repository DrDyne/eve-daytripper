module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: "babel-loader"
  },
  {
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader?modules'
      + '&importLoaders=1'
      + '&localIndentName=[name]__[local]__${widgetName}__[hash:base64:5]',
      //'postcss-loader?sourceMap',
      'sass-loader'
    ],
    exclude: ['node_modules']
  },
  {
    test: /\.css$/,
    loaders: [
      'style-loader',
      'css-loader?modules'
      + '&importLoaders=1'
      + '&localIndentName=[name]__[local]__${widgetName}__[hash:base64:5]',
      //'postcss-loader?sourceMap'
    ],
    exclude: ['node_modules']
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader"
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?prefix=font/&limit=5000"
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=application/octet-stream"
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/gif"
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/jpg"
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=10000&mimetype=image/png"
  },
  { // typeface-roboto installed with npm
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    include: /typeface-roboto/,
    loader: "url-loader?limit=10000"
  },
  {
    test: /locales\/.*.json/,
    include: /locales/,
    loader: "file-loader?limit=10000&mimetype=application/json"
  }
];

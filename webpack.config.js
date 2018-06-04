var path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'statistic.js',
    path: path.resolve(__dirname, 'dist'),
    library: "statistic",
    libraryTarget: 'umd'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
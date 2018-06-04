var path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'zklog.js',
    path: path.resolve(__dirname, 'dist'),
    library: "zklog",
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
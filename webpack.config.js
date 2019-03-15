var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "statistic.js",
    path: path.resolve(__dirname, "dist"),
    library: "Statistic",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader"
      }
    ]
  }
};

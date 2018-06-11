const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{
  context: __dirname + "/src/main/js",
  entry: "./index",
  output: {
    path: __dirname + "/src/main/resources/public",
    filename: "build.js"
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader"}
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js$/
    })
  ]
}]
module.exports = [{
  context: __dirname + "/src/main/js",
  entry: "./index",
  output: {
    path: __dirname + "/src/main/resources/public",
    filename: "build.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  }
}]
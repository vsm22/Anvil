const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{

    // watch: true,

    devtool: "inline-source-map",

    context: __dirname + "/src/main/js",

    entry: "./index",

    output: {
        path: __dirname + "/src/main/resources/public",
        filename: "build.js"
    },

    resolve: {
        alias: {
            config$: path.resolve(__dirname, "src/main/js/config/config.js"),
            services: path.resolve(__dirname, "src/main/js/services"),
            graphics: path.resolve(__dirname, "src/main/js/graphics")
        }
    },

    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader" }
        ]
    },

    plugins: [
//        new UglifyJsPlugin({
//            test: /\.js$/
//        })
    ]
}]
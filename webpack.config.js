const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
            config: path.resolve(__dirname, "src/main/js/config"),
            components: path.resolve(__dirname, "src/main/js/components"),
            services: path.resolve(__dirname, "src/main/js/services"),
            routes: path.resolve(__dirname, "src/main/js/routes"),
            graphics: path.resolve(__dirname, "src/main/js/graphics")
        }
    },

    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader" },

            {
                test: /\.scss$/,
                use: [
                    // process.env.NODE_ENV !== 'production' ? 'style-loader' :
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }

        ]
    },

    plugins: [
//        new UglifyJsPlugin({
//            test: /\.js$/
//        }),

        new MiniCssExtractPlugin({
            filename: "stylesheets/anvil-stylesheet.css"
        })
    ]
}]
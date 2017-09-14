const path = require("path");
const Webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.min.js",
    },

    watchOptions: {
        ignored: [
            path.resolve(__dirname, "./node_modules"),
            path.resolve(__dirname, "./dist"),
        ],
    },

    devtool: "source-map",
    context: __dirname,
    target: "web",

    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|otf|ttf)$/,
                use: "url-loader?limit=1000",
            },
            {
                test: /\.json$/,
                use: "json-loader",
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                }),
            },
        ],
    },

    plugins: [
        new Webpack.optimize.ModuleConcatenationPlugin(),

        new Webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require("autoprefixer"),
                ],
            },
        }),

        new ExtractTextPlugin({
            filename: "./index.min.css",
            allChunks: true,
        }),
    ],
};

module.exports = config;

const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: [
        './src/index.js',
        './src/styles/index.scss'
    ],
    output: {
        path: path.resolve(__dirname + '/public/builds'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader?sourceMap",
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, '/public/builds'),
        port: 3000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new CleanWebpackPlugin(),
    ]
};

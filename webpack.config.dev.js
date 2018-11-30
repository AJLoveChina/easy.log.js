const merge = require('webpack-merge');
const common = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: "development",
    entry: "./src/index.test.js",
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "test.html")
        })
    ],
    devServer: {
        contentBase: './dist'
    },
});

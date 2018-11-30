const merge = require('webpack-merge');
const common = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
});

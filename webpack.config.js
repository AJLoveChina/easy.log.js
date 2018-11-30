const path = require('path');


module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "easy.log.js",
        path: path.resolve(__dirname, "./dist"),
        library: 'LOG',
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

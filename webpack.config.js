var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/main.jsx'],
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: [/node_modules/, /public/],
                query:
                      {
                        presets:['es2015','react']
                      }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
}

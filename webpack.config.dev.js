const merge = require('webpack-merge')
const config = require('./webpack.config')
const webpack = require('webpack')

module.exports = merge(config, {
    mode: 'development',
    entry: './dev/index.js',
    output: {
        filename: 'dev-main.js'
    },
    devServer: {
        hot: true,
        open: true,
        openPage: 'dev/'
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

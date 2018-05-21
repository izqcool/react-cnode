const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.config');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(webpackCommon,{
    devtool:'inline-source-map',
    mode: 'development',
    plugins: [
        new DefinePlugin({

        })
    ]
});
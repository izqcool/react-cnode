const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.config');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(webpackCommon,{
    devtool:'source-map',

    mode: 'production',

    plugins: [
        new DefinePlugin({

        }),
        new UglifyJsPlugin()
    ],

});
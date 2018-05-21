const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const DefinePlugin = require('webpack/lib/DefinePlugin');


module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'build.js',
        path: __dirname+'/dist'
    },
    performance : {
        hints : false
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['env','react','stage-1']
                        }
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[name]__[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer')(
                                    {
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie <9'
                                        ],
                                        flexbox: 'no-2009'
                                    }
                                ),
                                require('postcss-px-to-viewport')(
                                    {
                                        viewportWidth: 750,
                                        viewportHeight: 1334,
                                        unitPrecision: 3,
                                        viewportUnit: 'vw',
                                        selectorBlackList: ['.ignore'],
                                        minPixelValue: 1,
                                        mediaQuery: false
                                    }
                                )
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }

                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-cnode',
            inject: true,
            template: path.resolve(__dirname,'../public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        // new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]


};


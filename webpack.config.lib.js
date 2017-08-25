/* eslint-disable jsx-a11y/href-no-hash */

const path = require('path');

const cssLoaders = (modules) => [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader',
        options: modules ? {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
        } : undefined,
    }, {
        loader: 'postcss-loader',
    },
];

module.exports = {
    entry: {
        index: './index.jsx',
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: '[name].js',
        library: ['react-spread-input', '[name]'],
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    devtool: 'source-map',
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
        extensions: ['*', '.js', '.jsx', '.json'],
        alias: {},
    },
    externals: {
        react: 'react',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
            }],
        }],
    },
};

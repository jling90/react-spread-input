module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'index.js',
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};

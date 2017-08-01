module.exports = {
    entry: './test/index.jsx',
    output: {
        filename: './test/index.js',
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};

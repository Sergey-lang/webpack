const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

    console.log('[Mode]: ', env.mode);

    return {
        mode: env.mode ?? 'development', // https://webpack.js.org/configuration/mode/#root
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}) // https://webpack.js.org/concepts/#plugins
        ]
    }
}
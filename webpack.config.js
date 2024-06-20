const path = require('path');

module.exports = (env) => {

    console.log('Mode: ', env.mode); // true

    return {
        mode: env.mode ?? 'development', // https://webpack.js.org/configuration/mode/#root
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },
    }
}
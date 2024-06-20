// https://webpack.js.org/configuration/configuration-languages/
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import webpack from 'webpack';

type ModeType = 'production' | 'development'

interface EnvVariables {
    mode: ModeType
}

export default (env: EnvVariables) => {

    console.log('[Mode]: ', env.mode);

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development', // https://webpack.js.org/configuration/mode/#root
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),// https://webpack.js.org/concepts/#plugins
            new webpack.ProgressPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // https://webpack.js.org/guides/typescript/#loader
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    };
    return config
}
// https://webpack.js.org/configuration/configuration-languages/
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
const devServer: DevServerConfiguration = {};

type ModeType = 'production' | 'development'

interface EnvVariables {
    mode: ModeType;
    port: number;
}

export default (env: EnvVariables) => {

    console.log('[Mode]: ', env.mode);
    console.log('[Port]: ', env.port);

    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development', // https://webpack.js.org/configuration/mode/#root
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),// https://webpack.js.org/concepts/#plugins
            isDev && new webpack.ProgressPlugin(),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // https://webpack.js.org/guides/typescript/#loader work with JSX*
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true,
            static: './dist',
        } : undefined,
        optimization: {
            runtimeChunk: 'single',
        },
        devtool: isDev && 'inline-source-map', // https://webpack.js.org/guides/development/#using-source-maps
    };
    return config
}
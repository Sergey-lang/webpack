import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IBuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({mode, paths, analyzer, platform}: IBuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico')}),// https://webpack.js.org/concepts/#plugins
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
        }), // https://webpack.js.org/plugins/define-plugin/
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin()); // https://www.npmjs.com/package/fork-ts-checker-webpack-plugin
        plugins.push(new ReactRefreshWebpackPlugin()) // https://github.com/pmmmwh/react-refresh-webpack-plugin/
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        })) // https://webpack.js.org/plugins/mini-css-extract-plugin/)
        plugins.push(
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
                ],
            }), // https://webpack.js.org/plugins/copy-webpack-plugin/
        )
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
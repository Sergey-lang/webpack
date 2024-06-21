import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { IBuildOptions } from './types/types';

export function buildWebpack(options: IBuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const isDev = options.mode === 'development';
    return {
        mode: mode ?? 'development', // https://webpack.js.org/configuration/mode/#root
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.output,
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: {
            runtimeChunk: 'single',
        },
        devtool: isDev && 'inline-source-map', // https://webpack.js.org/guides/development/#using-source-maps
    }
}
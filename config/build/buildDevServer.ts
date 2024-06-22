import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/types';

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        static: './dist',
        // static for nginx - need to do proxying to index.html
        historyApiFallback: true, // https://webpack.js.org/configuration/dev-server/
        hot: true // https://webpack.js.org/guides/hot-module-replacement/
    }
}
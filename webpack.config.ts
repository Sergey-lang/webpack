// https://webpack.js.org/configuration/configuration-languages/
import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildModeType, IBuildPath } from './config/build/types/types';
import path from 'path';

interface EnvVariables {
    mode: BuildModeType;
    port: number;
    analyzer?: boolean;
}

export default (env: EnvVariables) => {
    console.log('[Mode]: ', env.mode);
    console.log('[Port]: ', env.port);

    const paths: IBuildPath = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    const config: webpack.Configuration = buildWebpack({
        mode: env.mode ?? 'development',
        port: env.port ?? 3000,
        analyzer: env.analyzer,
        paths
    })
    return config
}
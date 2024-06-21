import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IBuildOptions } from './types/types';

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const ccsLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
            esModule: false,
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            ccsLoaderWithModules,
            // Compiles Sass to CSS
            'sass-loader',
        ],
    }

    const tsLoader = {
        test: /\.tsx?$/, // https://webpack.js.org/guides/typescript/#loader work with JSX*
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        scssLoader,
        tsLoader,
    ]
}
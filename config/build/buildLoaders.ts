import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IBuildOptions } from './types/types';

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    } // https://webpack.js.org/guides/asset-management/

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgo: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

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
    // or babel loader without TS
    const tsLoader = {
        test: /\.tsx?$/, // https://webpack.js.org/guides/typescript/#loader work with JSX*
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true, // https://webpack.js.org/guides/build-performance/
                },
            },
        ],
        exclude: /node_modules/,
    }

    return [
        svgLoader,
        assetLoader,
        scssLoader,
        tsLoader,
    ]
}
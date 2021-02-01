const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const BUNDLE_HEADER = `
${packageJson.description} v${packageJson.version}
${packageJson.homepage}

Released under the MIT License.

Build date: ${new Date().toISOString()}
`.trim();

module.exports = [
    {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            plugins: [
                new TsconfigPathsPlugin()
            ],
        },
        plugins: [
            new webpack.BannerPlugin({banner: BUNDLE_HEADER})
        ],
        entry: './src/main/index.ts',
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'erdiagram-cli.js'
        },
        stats: {
            warningsFilter: [
                './node_modules/yargs/index.js'
            ]
        }
    }
];

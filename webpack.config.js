const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const BUNDLE_HEADER = `#!/usr/bin/env node
/*!
 * ${packageJson.description} v${packageJson.version}
 * ${packageJson.homepage}
 *
 * Released under the MIT License.
 *
 * Build date: ${new Date().toISOString()}
 */`;

const OUTPUT_DIR = 'dist';
const OUTPUT_FILENAME = 'erdiagram-cli.js';

class ChmodPlugin {

    constructor(file, mode) {
        this.file = file;
        this.mode = mode;
    }

    apply(compiler) {
        compiler.hooks.done.tap('ChmodPlugin', () => {
            fs.chmodSync(this.file, this.mode);
        });
    }
}

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
            new webpack.BannerPlugin({banner: BUNDLE_HEADER, raw: true}),
            new ChmodPlugin(`${OUTPUT_DIR}/${OUTPUT_FILENAME}`, '755')
        ],
        entry: './src/main/index.ts',
        target: 'node',
        output: {
            path: path.resolve(__dirname, OUTPUT_DIR),
            filename: OUTPUT_FILENAME
        },
        stats: {
            warningsFilter: [
                './node_modules/yargs/index.js'
            ]
        }
    }
];

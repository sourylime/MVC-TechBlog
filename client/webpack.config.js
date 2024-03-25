const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                chunks: ['main'],
            }),
            new HtmlWebpackPlugin({
                template: './src/install.html',
                filename: 'install.html',
                chunks: ['install'],
            }),
            new WebpackPwaManifest({
                name: 'Jate',
                short_name: 'Jate',
                description: 'A simple note-taking app',
                background_color: '#ffffff',
                theme_color: '#2196f3',
                start_url: '/',
                icons: [
                    {
                        src: path.resolve('src/img/icon.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                    },
                ],
            }),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'sw.js',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/manifest.webmanifest',
                        to: 'manifest.webmanifest',
                    },
                    {
                        from: 'src/img',
                        to: 'img',
                    },
                ],
            }),

        ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
    };
};

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const developed = process.env.NODE_ENV == 'development';

const packageInfo = fs.readFileSync(path.resolve(__dirname, 'package.json'));
const packageSetting = JSON.parse(packageInfo);
const version = packageSetting.version;

const configuration = {
    target: 'web',
    entry: {
        utilitiex: path.resolve(__dirname, 'main', 'all.js'),
        cookie: path.resolve(__dirname, 'main', 'cookie.js'),
        debounce: path.resolve(__dirname, 'main', 'debounce.js'),
        throttle: path.resolve(__dirname, 'main', 'throttle.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        },]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            }
        }),
        new webpack.BannerPlugin(` [name] ${version}\r\n copyright © 2020 Chen Shen Chao\r\n https://github.com/chaosannals/utilitiex`)
    ],
};

if (developed) {
    configuration.devServer = {
        port: 8000,
        index: 'index.html',
        contentBase: path.join(__dirname, 'demo'),
        overlay: {
            errors: true
        },
        hot: true
    };
    configuration.plugins.push(
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'demo', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = configuration;
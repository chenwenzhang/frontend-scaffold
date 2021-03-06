"use strict";

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const config = require("./config-factory").get();
const paths = require("./path-factory").get();
const entries = require("./entries");
const babelPresetEnvPath = `${path.dirname(__dirname)}/node_modules/babel-preset-env`;
const babelPreset = fs.existsSync(babelPresetEnvPath) ? babelPresetEnvPath : "env";

const webpackBaseConfig = {
    entry: entries,
    output: {
        path: path.dirname(paths.distResource),
        publicPath: config.build.publicPath,
        filename: `${config.directory.resource}/js/[name].[hash].js`
    },
    resolveLoader: {
        modules: [
            "node_modules",
            `${path.dirname(__dirname)}/node_modules`,
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"],
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    name: `${config.directory.resource}/images/[name].[hash].[ext]`,
                    limit: 8192,
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    name: `${config.directory.resource}/fonts/[name].[hash].[ext]`,
                    limit: 8192,
                },
            },
            {
                test: /\.(html|ftl|vm)$/,
                loader: "html-withimg-loader?min=false",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        babelPreset,
                    ],
                },
            },
        ],
    },
    plugins: [
        new ExtractTextWebpackPlugin(`${config.directory.resource}/css/[name].[hash].css`),
        new webpack.ProvidePlugin(config.build.provides),
    ],
};

module.exports = webpackBaseConfig;
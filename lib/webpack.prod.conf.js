"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

const webpackBaseConfig = require("./webpack.base.conf");
const helper = require("./helper");
const config = require("./config-factory").get();
const paths = require("./path-factory").get();
const pages = require("./pages");
const pageConfigs = require("./page-configs");

let webpackProdConfig = merge(webpackBaseConfig, {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: config.build.commonChunkName,
            minChunks: config.build.minCommonChunks,
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
});

pages.forEach(page => {
    let pageConfig = pageConfigs[page];
    webpackProdConfig.plugins.push(new HtmlWebpackPlugin({
        filename: `${paths.distView}/${page}.${pageConfig.ext}`,
        template: helper.generateViewPath(page),
        chunks: [config.build.commonChunkName, page],
        inject: true,
    }));
});

module.exports = webpackProdConfig;
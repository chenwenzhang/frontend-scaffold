"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackBaseConfig = require("./webpack.base.conf");
const helper = require("./helper");
const config = require("./config-factory").get();
const pages = require("./pages");
const pageConfigs = require("./page-configs");

let webpackDevConfig = merge(webpackBaseConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});

pages.forEach(page => {
    let pageConfig = pageConfigs[page];
    webpackDevConfig.plugins.push(new HtmlWebpackPlugin({
        filename: `${page}.${pageConfig.ext}`,
        template: helper.generateViewPath(page),
        chunks: [page],
        inject: true,
    }));
});

module.exports = webpackDevConfig;
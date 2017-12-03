"use strict";

const pathFactory = require("./path-factory");
const configFactory = require("./config-factory");

module.exports = {
    init() {
        let helper = require("./helper");
        let paths = pathFactory.get();
        helper.mkdirRecursive(paths.src);
        helper.mkdirRecursive(paths.page);
        helper.mkdirRecursive(paths.srcResource);
        helper.mkdirRecursive(paths.layout);
        helper.mkdirRecursive(paths.mock);
    },
    build(callback) {
        let webpack = require("webpack");
        let rm = require("rimraf");
        let paths = pathFactory.get();
        let webpackConfig = require("./webpack.prod.conf");
        rm(paths.distResource, err => {
            if (err) {
                throw err;
            }
            rm(paths.distView, err => {
                if (err) {
                    throw err;
                }
                webpack(webpackConfig, (err, stats) => {
                    if (err) {
                        throw err;
                    }
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + "\n\n");
                    if (typeof callback === "function") {
                        callback();
                    }
                });
            });
        });
    },
    start() {

    },
    setRoot(root) {
        pathFactory.setRoot(root);
    },
    config(config) {
        configFactory.merge(config);
    }
};
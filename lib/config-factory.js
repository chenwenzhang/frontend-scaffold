"use strict";

const merge = require("webpack-merge");
let _config = require("./_default_config.json");

module.exports = {
    merge(config) {
        if (typeof config === "object") {
            _config = merge(_config, config);
        }
    },
    get() {
        return _config;
    }
};
"use strict";

const fs = require("fs");
const merge = require("webpack-merge");
const pages = require("./pages");
const paths = require("./path-factory").get();
const defaultPageConfig = require("./_default_page_config.json");
const helper = require("./helper");

module.exports = pages.reduce((configs, page) => {
    let file = `${paths.page}/${page}/${helper.getPageConfigFilename()}`;
    configs[page] = merge({}, defaultPageConfig);
    if (fs.existsSync(file)) {
        configs[page] = merge(configs[page], require(file));
    }
    return configs;
}, {});
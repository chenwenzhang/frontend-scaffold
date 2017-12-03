"use strict";

const path = require("path");
const glob = require("glob");
const paths = require("./path-factory").get();
const helper = require("./helper");

module.exports = glob.sync(`${paths.mock}/**/${helper.getPageConfigFilename()}`).reduce((mockServers, file) => {
    let config = require(file);
    let method = config.method;
    let route = config.route;
    mockServers[method][route] = {
        type: config.type,
        file: `${path.dirname(file)}/${helper.getMockServerExecFilename(config.type)}`,
        inject: config.inject,
    };
    return mockServers;
}, {
    post: {},
    get: {}
});
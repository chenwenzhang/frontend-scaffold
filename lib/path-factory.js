"use strict";

const config = require("./config-factory").get();
const paths = {};
const PathFactory = {
    setRoot(root) {
        paths.root = root;
        paths.src = `${root}/${config.directory.src}`;
        paths.page = `${paths.src}/page`;
        paths.srcResource = `${paths.src}/resource`;
        paths.layout = `${paths.src}/layout`;
        paths.mock = `${paths.src}/mock`;
        paths.distView = `${root}/${config.directory.viewDist}/${config.directory.view}`;
        paths.distResource = `${root}/${config.directory.resourceDist}/${config.directory.resource}`;
        PathFactory.setRoot = () => {}
    },
    get() {
        return paths;
    }
};
module.exports = PathFactory;
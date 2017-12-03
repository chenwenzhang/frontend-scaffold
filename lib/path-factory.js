"use strict";

const paths = {};
const PathFactory = {
    setRoot(root) {
        let config = require("./config-factory").get();
        paths.root = root;
        paths.src = `${root}/${config.directory.src}`;
        paths.page = `${paths.src}/page`;
        paths.srcResource = `${paths.src}/resource`;
        paths.layout = `${paths.src}/layout`;
        paths.mock = `${paths.src}/mock`;
        paths.distView = config.directory.view.length === 0 ? `${root}/${config.directory.viewDist}` :
            `${root}/${config.directory.viewDist}/${config.directory.view}`;
        paths.distResource = config.directory.resource.length === 0 ? `${root}/${config.directory.resourceDist}` :
            `${root}/${config.directory.resourceDist}/${config.directory.resource}`;
        PathFactory.setRoot = () => {}
    },
    get() {
        return paths;
    }
};
module.exports = PathFactory;
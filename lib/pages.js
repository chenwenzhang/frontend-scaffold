"use strict";

const path = require("path");
const glob = require("glob");
const paths = require("./path-factory").get();

module.exports = glob.sync(`${paths.page}/**/entry.js`).reduce((pages, file) => {
    pages.push(path.dirname(file).replace(`${paths.page}/`, ""));
    return pages;
}, []);
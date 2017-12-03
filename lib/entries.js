"use strict";

const helper = require("./helper");
const pages = require("./pages");

module.exports = pages.reduce((entries, page) => {
    entries[page] = helper.generateEntryPath(page);
    return entries;
}, {});
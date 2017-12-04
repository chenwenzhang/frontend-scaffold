"use strict";

const path = require("path");
const scaffold = require("../lib/frontend-scaffold");
scaffold.config({});
scaffold.setRoot(path.dirname(__dirname) + "/demo");

console.log(__dirname);

// page configs
// const pageConfigs = require("../lib/page-configs");

// mock servers
// const mockServers = require("../lib/mock-servers");

// build project
// scaffold.build();
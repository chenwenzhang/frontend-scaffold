"use strict";

const path = require("path");
const scaffold = require("../lib/frontend-scaffold");
scaffold.setRoot(path.dirname(__dirname) + "/demo");
scaffold.config({});

scaffold.build();
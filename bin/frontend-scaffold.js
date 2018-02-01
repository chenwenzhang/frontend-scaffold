#!/usr/bin/env node

"use strict";

const fs = require("fs");
const root = process.cwd();
const filename = "frontend-scaffold.json";
const file = `${root}/${filename}`;
const scaffold = require("../lib/frontend-scaffold");
const check = () => {
    if (!fs.existsSync(file)) {
        console.error(`file '${filename}' does not exists`);
        process.exit(1);
    }
};
const initScaffold = () => {
    let config = require(file);
    scaffold.config(config);
    scaffold.setRoot(root);
};

const yargs = require("yargs");
const argv = yargs
    .command({
        command: "init",
        describe: "init a project",
        builder: {},
        handler: () => {
            try {
                check();
                initScaffold();
                scaffold.init();
                console.info("project init success");
                process.exit(0);
            } catch (e) {
                console.error(e);
                process.exit(1);
            }
        }
    })
    .command({
        command: "build",
        describe: "build a project",
        builder: {},
        handler: () => {
            try {
                check();
                initScaffold();
                scaffold.build(() => {
                    process.exit(0);
                });
            } catch (e) {
                console.error(e);
                process.exit(1);
            }
        }
    })
    .command({
        command: "start",
        describe: "start a development server",
        builder: {},
        handler: () => {
            try {
                check();
                initScaffold();
                scaffold.start(() => {
                    process.exit(0);
                });
            } catch (e) {
                console.log(e);
                process.exit(1);
            }
        }
    })
    .help("h")
    .alias("h", "help")
    .argv;


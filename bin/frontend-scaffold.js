#!/usr/bin/env node

"use strict";

const fs = require("fs");
const root = process.cwd();
const filename = "frontend-scaffold.json";
const file = `${root}/${filename}`;

if (!fs.existsSync(file)) {
    console.error(`file '${filename}' does not exists`);
    process.exit(1);
}

const config = require(file);
const scaffold = require("../lib/frontend-scaffold");
scaffold.setRoot(root);
scaffold.config(config);

const yargs = require("yargs");
const argv = yargs
    .command({
        command: "init",
        describe: "init a project",
        builder: {},
        handler: () => {
            try {
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
                scaffold.build(() => {
                    process.exit(0);
                });
            } catch (e) {
                console.error(e);
                process.exit(0);
            }
        }
    })
    .command({
        command: "start",
        describe: "start a development server",
        builder: {},
        handler: () => scaffold.start()
    })
    .help("h")
    .alias("h", "help")
    .argv;
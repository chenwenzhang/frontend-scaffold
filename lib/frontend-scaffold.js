"use strict";

const pathFactory = require("./path-factory");
const configFactory = require("./config-factory");

module.exports = {
    init() {
        let helper = require("./helper");
        let paths = pathFactory.get();
        helper.mkdirRecursive(paths.src);
        helper.mkdirRecursive(paths.page);
        helper.mkdirRecursive(paths.srcResource);
        helper.mkdirRecursive(paths.layout);
        helper.mkdirRecursive(paths.mock);
    },
    build(callback) {
        let webpack = require("webpack");
        let rm = require("rimraf");
        let paths = pathFactory.get();
        let webpackConfig = require("./webpack.prod.conf");
        rm(paths.distResource, err => {
            if (err) {
                throw err;
            }
            rm(paths.distView, err => {
                if (err) {
                    throw err;
                }
                webpack(webpackConfig, (err, stats) => {
                    if (err) {
                        throw err;
                    }
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + "\n\n");
                    if (typeof callback === "function") {
                        callback();
                    }
                });
            });
        });
    },
    start(callback) {
        let path = require("path");
        let express = require("express");
        let bodyParser = require("body-parser");
        let opn = require("opn");
        let webpack = require("webpack");
        let helper = require("./helper");
        let config = configFactory.get();
        let paths = pathFactory.get();
        let mockServers = require("./mock-servers");
        let pages = require("./pages");
        let pageConfigs = require("./page-configs");
        let webpackConfig = require("./webpack.dev.conf");
        let app = express();
        let compiler = webpack(webpackConfig);
        let uri = `http://localhost:${config.dev.port}`;
        let openUri = `${uri}${config.dev.autoOpenRoute}`;
        let devMiddleware = require("webpack-dev-middleware")(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true,
        });
        let hotMiddleware = require("webpack-hot-middleware")(compiler, {
            log: () => {},
            heartbeat: 2000,
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        Object.keys(mockServers).forEach(method => {
            Object.keys(mockServers[method]).forEach(route => {
                app[method](route, (req, res) => {
                    res.send(helper.mockServerHandler(mockServers[method][route], req));
                });
            });
        });

        pages.forEach(page => {
            let pageConfig = pageConfigs[page];
            let route = pageConfig.route.length === 0 ? `/${page}` : pageConfig.route;
            app.get(route, (req, res) => {
                let templateFile = `${paths.root}/${config.directory.resourceDist}/${page}.${pageConfig.ext}`;
                devMiddleware.fileSystem.readFile(templateFile, (err, data) => {
                    let template = data.toString();
                    let pageData = helper.getDevPageData(page, pageConfig.data);
                    res.setHeader("Content-Type", "text/html;charset=UTF-8");
                    res.setHeader("Content-Length", template.length);
                    require(`./engine/${pageConfig.engine}`)(template, pageData, result => {
                        res.send(result);
                    });
                });
            });
        });

        app.use(require("connect-history-api-fallback")());
        app.use(devMiddleware);
        app.use(hotMiddleware);
        app.use(`/${config.directory.resource}`, express.static(paths.distResource));

        compiler.plugin("compilation", function (compilation) {
            compilation.plugin("html-webpack-plugin-after-emit", (data, callback) => {
                hotMiddleware.publish({
                    action: "reload",
                });
                callback();
            });
        });

        console.log("> Starting dev server...");
        devMiddleware.waitUntilValid(() => {
            console.log(`> Listening at ${uri}`);
            if (config.dev.autoOpenBrowser) {
                console.log(`> Open uri ${openUri}\n`);
                opn(openUri);
            }
        });

        const server = app.listen(config.dev.port);
        module.exports = {
            close: () => {
                server.close();
                if (typeof callback === "function") {
                    callback();
                }
            },
        };
    },
    setRoot(root) {
        pathFactory.setRoot(root);
    },
    config(config) {
        configFactory.merge(config);
    }
};
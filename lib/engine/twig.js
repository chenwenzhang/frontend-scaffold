"use strict";

const Twig = require("twig");
const twig = Twig.twig;

module.exports = (template, data, callback) => {
    let result = twig({data: template}).render(data);
    callback(result);
};
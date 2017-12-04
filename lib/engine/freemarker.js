"use strict";

const Freemarker = require("freemarker");
module.exports = (template, data, callback) => {
    let freemarker = new Freemarker();
    freemarker.render(template, data, (err, result) => {
        if (err) {
            callback("500 Server Error - Freemarker \n\n" + err);
        } else {
            callback(result);
        }
    });
};
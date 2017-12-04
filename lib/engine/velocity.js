"use strict";

const Velocity = require("velocityjs");
module.exports = (template, data, callback) => {
    let result = Velocity.render(template, data);
    callback(result);
};
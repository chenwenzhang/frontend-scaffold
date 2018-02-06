const layout = require("../../../../../lib/layout");
const templateHtml = require("../../../layout/layout.html");
const content = "<h1>Hello world</h1>";
module.exports = layout.render(templateHtml, {
    content: content
});
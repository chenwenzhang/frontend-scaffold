const Handlebars = require("handlebars");
module.exports = {
    render(templateHtml, data) {
        let template =  Handlebars.compile(templateHtml);
        return template(data);
    }
};
const metrics = require("./metrics");

// load the routes of module
exports.loadRoutes = function (app) {
    app.post("/metric/:key", metrics.addMetric);
    app.get("/metric/:key/sum", metrics.getMetricSum);
};

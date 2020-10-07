const Router = require("express").Router;
const metricsApi = require("./metrics/routes");

exports.initializeAPI = () => {
    const router = Router();

    router.get("/helloworld", (req, res) => {
        res.send("hello world");
    });

    metricsApi.loadRoutes(router);

    return router;
};
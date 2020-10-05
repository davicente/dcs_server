require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loggerLib = require("./libs/logger");
const utils = require("./libs/utils");


const runServer = async () => {
    const app = express();
    app.server = http.createServer(app);

    // aplying CORS
    app.use(cors({}));

    // initialize logs folder
    loggerLib.initializeLogger(app);
    await utils.createFolder(process.env.LOGS_DIR_NAME);
    const logger = loggerLib.getLogger();

    // load api routes
    const routes = require("./api/routes");

    // 3rd party middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: process.env.BODY_LIMIT }));

    // api router
    app.use(process.env.API_PATH, routes.initializeAPI());

    app.server.listen(process.env.SERVER_PORT, () => {
        logger.info(`Started on port ${app.server.address().port}`);
    });
};


runServer();

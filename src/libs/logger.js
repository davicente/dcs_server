const express_logger = require('express-logger-unique-req-id');

const fileConf = {
    level: 'debug',
    filename: `./${process.env.LOGS_DIR_NAME}/${process.env.LOGS_FILE_NAME}`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true
};

exports.initializeLogger = app => express_logger.initializeLogger(app, fileConf);
exports.getLogger = () => express_logger.getLogger();

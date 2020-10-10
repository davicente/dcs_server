const constants = require('../../libs/constants');
const logger = require("../../libs/logger").getLogger();
const metricsController = require("../../controller/metrics/metrics");

exports.addMetric = (req, res, next) => {
    try {
        const key = req.params.key;
        const { value } = req.body;
        logger.debug(`Trying to add value ${value} to metric ${key}`);
        if (!value || isNaN(value)) {
            logger.info(`Wrong value: ${value}`);
            return res.status(400).send({ message: constants.NOT_NUMBER_ERROR });
        }
        metricsController.addMetric(key, Number(value));
        logger.info(`Value added to metric - ${key}: ${value}`);
        return res.send();
    } catch (error) {
        logger.error(error);
    }
};

exports.getMetricSum = (req, res, next) => {
    try {
        const key = req.params.key;
        logger.debug(`Retrieving sum of metric ${key}`);
        const value = metricsController.getMetricSum(key);
        logger.info(`Returning sum of metric ${key}: ${value}`);
        return res.status(200).send({ value });
    } catch (error) {
        logger.error(error);
    }
};

const constants = require('../../libs/constants');
const logger = require("../../libs/logger").getLogger();
const metricsController = require("../../controller/metrics/metrics");

exports.addMetric = (req, res, next) => {
    try {
        const key = req.params.key;
        const { value } = req.body;
        if (!value || isNaN(value)) {
            return res.status(400).send({ message: constants.NOT_NUMBER_ERROR });
        }
        metricsController.addMetric(key, Number(value));
        return res.send();
    } catch (error) {
        logger.error(error);
    }
};

exports.getMetricSum = (req, res, next) => {
    try {
        const key = req.params.key;
        const sum = metricsController.getMetricSum(key);
        return res.status(200).send({ sum });
    } catch (error) {
        logger.error(error);
    }
};

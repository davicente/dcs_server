const schedule = require('node-schedule');
const constants = require('../../libs/constants');
const logger = require("../../libs/logger").getLogger();

const metricsDates = {};
const metricsSums = {};


exports.addMetric = (key, value) => {
    if(isNaN(value)) throw constants.NOT_NUMBER_ERROR;
    value = Math.round(value);
    if (!metricsDates[key]) {
        metricsDates[key] = [];
        metricsSums[key] = 0;
    }
    const emptyMetric = metricsDates[key].length === 0 ? true : false;
    const date = new Date();
    const newMetric = { value, date };
    metricsDates[key].push(newMetric);
    metricsSums[key] += value;
    if (emptyMetric) scheduleRemoveMetric(key, value, date);
    return;
};


exports.getMetricSum = key => {
    return metricsSums[key] ? metricsSums[key] : 0;
};


const scheduleRemoveMetric = (key, value, date) => {
    const dateToProgram = new Date(date.valueOf());
    dateToProgram.setSeconds(dateToProgram.getSeconds() + Number(process.env.SECONDS_TO_REMOVE_METRIC));
    
    schedule.scheduleJob(dateToProgram, () => {
        logger.debug(`Removing old values for metric: "${key}"`);
        removePastDatesMetric(key);
        // if there are entries remaining for the metric, schedule oldest one for removing
        if(metricsDates[key].length > 0) {
            scheduleRemoveMetric(key, metricsDates[key][0].value, metricsDates[key][0].date);
        }
    });

    logger.debug(`Metric cleaning for metric "${key}" scheduled at ${dateToProgram}`);
};


const removePastDatesMetric = key => {
    // get last date to be removed
    const lastDateToRemove = new Date();
    lastDateToRemove.setSeconds(lastDateToRemove.getSeconds() - Number(process.env.SECONDS_TO_REMOVE_METRIC));
    let counter = 0;
    // remove all elements of the metric previous to the last date allowed
    while(metricsDates[key].length > 0 && metricsDates[key][0].date <= lastDateToRemove) {
        const metricToRemove = metricsDates[key].shift();
        metricsSums[key] -= metricToRemove.value;
        logger.debug(`Removed from metric "${key}": ${metricToRemove.value}`);
    }
};
